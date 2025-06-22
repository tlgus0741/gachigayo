const express = require('express');
const path = require('path');
const app = express();
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const cors = require('cors');
const MongoStore = require('connect-mongo');
const { MongoClient, ObjectId } = require('mongodb');
const nodemailer = require('nodemailer');
const checkoutNodeJssdk = require('@paypal/checkout-server-sdk');

// PayPal 환경 설정
let environment = new checkoutNodeJssdk.core.SandboxEnvironment(
  'ATo2wPm8KSTlbGNB1zrM_ZAE6g5zZGtH1_PrbY1hTWFTMyKUDw1Kwa7ODQH74YikUD9YNGP0Mahyvpn3',
  'EBf8dAm1WsPVrnUG-Gf9kb_CVoYG3QhhTgVVeSVc1l1uyKkxF35AIK70jhUGHdp6Px8YoAXyKTerqDfa'
);
let paypalClient = new checkoutNodeJssdk.core.PayPalHttpClient(environment);

// 미들웨어 설정
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// MongoDB 연결
let db;
const url = 'mongodb+srv://koreaglobalinstitue:fltnl635@cluster0.uztk5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(url);

async function connectDB() {
  try {
    await client.connect();
    console.log('MongoDB connection successful');
    db = client.db('koreaglobalinstitute');
    
    // 연결 후 서버 시작
    app.listen(1000, () => {
      console.log('Server is running on port 1000.');
    });
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
}

// 세션 설정
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false,
    maxAge: 24 * 60 * 60 * 1000
  },
  store: MongoStore.create({
    client: client,
    dbName: 'koreaglobalinstitute'
  })
}));

// Passport 초기화
app.use(passport.initialize());
app.use(passport.session());

// 정적 파일 제공
app.use(express.static(path.join(__dirname, 'koreaglobalinstitute/kgi/dist')));

// Passport 설정
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    const user = await db.collection('users').findOne({ email });
    
    if (!user) {
      return done(null, false, { message: 'User not found.' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return done(null, false, { message: 'Invalid email or password.' });
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

// 세션 직렬화/역직렬화
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.collection('users').findOne({ _id: new ObjectId(id) });
    done(null, user);
  } catch (error) {
    done(error);
  }
});

// 회원가입 인증코드 저장소
const registrationCodes = new Map();

// 이메일 전송을 위한 transporter 설정
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'koreaglobalinstitute@gmail.com', // 변경된 Gmail 주소
    pass: 'jhwf sxxp cdac lprj'      // koreaglobalinstitute@gmail.com의 앱 비밀번호로 변경 필요
  }
});

// 회원가입 인증코드 발송 API
app.post('/api/send-registration-code', async (req, res) => {
  const { email } = req.body;
  
  try {
    console.log('Attempting to send registration code to:', email);
    
    // Gmail 계정 검증
    if (!email.endsWith('@gmail.com')) {
      return res.json({ success: false, message: 'Only Gmail accounts are allowed.' });
    }

    // 이메일 형식 검증
    if (!email || !email.includes('@')) {
      console.log('Invalid email format:', email);
      return res.json({ success: false, message: 'Invalid email format' });
    }

    // 이메일 중복 체크
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: 'Email already registered.' });
    }

    // 6자리 랜덤 코드 생성
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    console.log('Generated registration code for:', email);
    
    // 이메일 발송
    const mailOptions = {
      from: 'engoy2726@gmail.com',
      to: email,
      subject: 'Email Verification Code for Registration',
      text: `Your verification code is: ${code}. This code will expire in 5 minutes.`
    };

    console.log('Sending email with options:', mailOptions);
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully to:', email);

    // 코드 저장 (5분 유효)
    registrationCodes.set(email, {
      code,
      expires: Date.now() + 5 * 60 * 1000
    });

    res.json({ success: true, message: 'Verification code sent successfully' });
  } catch (error) {
    console.error('Detailed error sending registration code:', error);
    res.json({ success: false, message: 'Failed to send verification code' });
  }
});

// 회원가입 인증코드 확인 API
app.post('/api/verify-registration-code', async (req, res) => {
  const { email, code } = req.body;

  try {
    const savedData = registrationCodes.get(email);
    if (!savedData || savedData.code !== code) {
      return res.json({ success: false, message: 'Invalid verification code' });
    }

    if (Date.now() > savedData.expires) {
      registrationCodes.delete(email);
      return res.json({ success: false, message: 'Verification code has expired' });
    }

    res.json({ success: true, message: 'Code verified successfully' });
  } catch (error) {
    console.error('Error verifying code:', error);
    res.json({ success: false, message: 'Failed to verify code' });
  }
});

// 회원가입 API
app.post('/api/register', async (req, res) => {
  try {
    const { email, password, name, verificationCode } = req.body;
    
    // 필수 필드 검증
    if (!email || !password || !name || !verificationCode) {
      return res.status(400).json({ 
        success: false,
        message: 'Please fill in all fields and verify your email.' 
      });
    }

    // 인증코드 확인
    const savedData = registrationCodes.get(email);
    if (!savedData || savedData.code !== verificationCode) {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid verification code.' 
      });
    }

    if (Date.now() > savedData.expires) {
      registrationCodes.delete(email);
      return res.status(400).json({ 
        success: false,
        message: 'Verification code has expired.' 
      });
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false,
        message: 'Please enter a valid email address.' 
      });
    }

    // 비밀번호 길이 검증
    if (password.length < 6) {
      return res.status(400).json({ 
        success: false,
        message: 'Password must be at least 6 characters long.' 
      });
    }

    // 이메일 중복 체크
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false,
        message: 'Email already registered.' 
      });
    }

    // 비밀번호 해시화
    const hashedPassword = await bcrypt.hash(password, 10);

    // 새 사용자 등록
    const result = await db.collection('users').insertOne({
      email,
      password: hashedPassword,
      name,
      role: 'user',
      createdAt: new Date()
    });

    if (result.acknowledged) {
      res.status(201).json({ 
        success: true,
        message: 'Registration successful.',
        user: {
          id: result.insertedId,
          email,
          name
        }
      });
    } else {
      throw new Error('Registration failed');
    }

    // 인증코드 삭제
    registrationCodes.delete(email);
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      success: false,
      message: 'An error occurred during registration. Please try again later.' 
    });
  }
});

// 로그인 API
app.post('/api/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Login error occurred' });
    }
    if (!user) {
      return res.status(401).json({ success: false, message: info.message });
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Login error occurred' });
      }
      return res.json({ 
        success: true, 
        message: 'Login successful',
        user: {
          email: user.email,
          name: user.name,
          role: user.role || 'user'
        }
      });
    });
  })(req, res, next);
});

// 로그아웃 API
app.post('/api/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout error occurred.' });
    }
    res.json({ message: 'Logged out successfully.' });
  });
});

// 현재 사용자 정보 API
app.get('/api/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      email: req.user.email,
      name: req.user.name,
      role: req.user.role || 'user'
    });
  } else {
    res.status(401).json({ message: 'Login required.' });
  }
});

// 인증 상태 확인 API
app.get('/api/check-auth', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ isAuthenticated: true });
  } else {
    res.json({ isAuthenticated: false });
  }
});

// 상담 신청 내역 조회 (이메일 기반)
app.get('/api/consultations', async (req, res) => {
  try {
    let query = {};
    // 사용자가 로그인되어 있고 관리자라면 모든 상담 내역 조회
    if (req.isAuthenticated() && req.user && req.user.role === 'admin') {
      query = {}; // 관리자는 모든 상담 내역 조회
    } 
    // 일반 사용자라면 로그인된 사용자 이메일로 조회
    else if (req.isAuthenticated() && req.user && req.user.email) {
      query.userAccountEmail = req.user.email;
    } 
    // 로그인되어 있지 않다면, 쿼리 파라미터의 이메일로 조회
    else {
      const email = req.query.email;
      if (email) query.email = email;
    }

    // 삭제되지 않은 상담 내역만 조회
    query.isDeleted = { $ne: true };

    const reports = await db.collection('kgi').find(query).sort({ _id: -1 }).toArray();
    res.json({ success: true, reports });
  } catch (err) {
    console.error('Error fetching consultations:', err);
    res.json({ success: false, error: err.message });
  }
});

// 상담 신청 내역 저장 API
app.post('/api/consultations', async (req, res) => {
  try {
    console.log('Consultation POST: isAuthenticated:', req.isAuthenticated());
    console.log('Consultation POST: req.user:', req.user);
    const consultation = req.body;
    
    const consultationToSave = {
      ...consultation,
      // paymentDetails 객체 안에 captureId가 중첩되어 있을 가능성도 고려하여 안전하게 추출
      captureId: consultation.captureId || consultation.paymentDetails?.purchase_units?.[0]?.payments?.captures?.[0]?.id,
      // 로그인된 사용자의 이메일을 userAccountEmail로 저장
      userAccountEmail: req.isAuthenticated() && req.user && req.user.email ? req.user.email : null
    };

    await db.collection('kgi').insertOne(consultationToSave);

    // 사용자에게 상담 신청 확인 이메일 전송
    const userMailOptions = {
      from: 'koreaglobalinstitute@gmail.com',
      to: consultation.email, // 사용자가 입력한 이메일 주소
      subject: '[Gachigayo] Your Consultation Request Has Been Received',
      text: `
        Hello ${consultation.name},
        
        Your consultation request has been successfully received.
        
        [Consultation Details]
        Date: ${consultation.preferredDate}
        Time: ${consultation.preferredTime}
        Platform: ${consultation.platform}
        ${consultation.platformId ? 'Platform ID: ' + consultation.platformId : ''}
        Message: ${consultation.message || 'N/A'}
        
        We will review your request and contact you shortly to confirm the consultation.
        
        Thank you for your interest in Gachigayo.
        
        Sincerely,
        Gachigayo Team
      `
    };
    await transporter.sendMail(userMailOptions);

    // 관리자에게 상담 신청 알림 이메일 전송 (기존 로직 유지)
    const adminMailOptions = {
      from: 'koreaglobalinstitute@gmail.com',
      to: 'koreaglobalinstitute@gmail.com',
      subject: '[Gachigayo] 새로운 상담 신청이 접수되었습니다',
      text: `
        [상담 신청 내역]
        이름: ${consultation.name}
        이메일: ${consultation.email}
        플랫폼: ${consultation.platform}
        플랫폼 ID: ${consultation.platformId}
        희망 날짜: ${consultation.preferredDate}
        희망 시간: ${consultation.preferredTime}
        메시지: ${consultation.message}
        결제상태: ${consultation.paymentStatus || '미결제'}
        결제ID: ${consultation.paymentId || '-'}
        첨부파일: ${consultation.fileName || '-'}
      `
    };
    await transporter.sendMail(adminMailOptions);

    res.json({ success: true });
  } catch (err) {
    console.error('Error saving consultation or sending email:', err);
    res.json({ success: false, error: err.message });
  }
});

// 상담 취소 API
app.post('/api/consultations/cancel', async (req, res) => {
  try {
    const { consultationId, cancelReason, cancelledByAdmin } = req.body;
    
    // 상담 정보 조회
    const consultation = await db.collection('kgi').findOne({ _id: new ObjectId(consultationId) });
    
    if (!consultation) {
      return res.json({ success: false, error: 'Consultation not found' });
    }

    // 상담일 7일 이내면 환불 불가 (단, 관리자는 예외)
    const today = new Date();
    const consultationDate = new Date(consultation.preferredDate);
    const diffDays = Math.ceil((consultationDate - today) / (1000 * 60 * 60 * 24));
    if (diffDays <= 7 && !cancelledByAdmin) {
      return res.json({ success: false, error: 'Refunds are not allowed within 7 days of the consultation date.' });
    }

    // PayPal 환불 처리
    if (consultation.paymentStatus === 'completed' && consultation.captureId) {
      try {
        // 환불 요청 생성 (캡처 ID 사용)
        const request = new checkoutNodeJssdk.payments.CapturesRefundRequest(consultation.captureId);
        request.requestBody({
          amount: {
            value: consultation.amount.toFixed(2), // 실제 결제된 금액 사용
            currency_code: "USD"
          },
          note_to_payer: "Consultation cancellation refund"
        });
        // 환불 처리
        const refund = await paypalClient.execute(request);
        // 상담 상태 업데이트
        await db.collection('kgi').updateOne(
          { _id: new ObjectId(consultationId) },
          { 
            $set: { 
              status: 'cancelled',
              cancelReason: cancelReason,
              cancelDate: new Date(),
              refundStatus: 'completed',
              refundId: refund.result.id,
              cancelledBy: cancelledByAdmin ? 'admin' : 'user'
            } 
          }
        );

        // 사용자에게 이메일 전송 (관리자에 의한 취소 여부 반영)
        const userCancelMailText = cancelledByAdmin
          ? `
            Hello ${consultation.name},
            
            Your consultation request has been cancelled by the administrator for the following reason:
            
            [Cancellation Details]
            Consultation Date: ${consultation.preferredDate}
            Consultation Time: ${consultation.preferredTime}
            Cancellation Reason: ${cancelReason}
            Refund Amount: $${consultation.amount.toFixed(2)}
            Refund Status: Completed
            
            The refunded amount is expected to be returned to your original payment method within 3-5 business days.
            
            If you have any further questions, please do not hesitate to contact us.
            
            Thank you.
            Gachigayo Team
          `
          : `
            Hello ${consultation.name},
            
            Your consultation cancellation request has been processed.
            
            [Cancellation Details]
            Consultation Date: ${consultation.preferredDate}
            Consultation Time: ${consultation.preferredTime}
            Cancellation Reason: ${cancelReason}
            Refund Amount: $${consultation.amount.toFixed(2)}
            Refund Status: Completed
            
            The refunded amount is expected to be returned to your original payment method within 3-5 business days.
            
            If you have any further questions, please do not hesitate to contact us.
            
            Thank you.
            Gachigayo Team
          `;

        const mailOptions = {
          from: 'koreaglobalinstitute@gmail.com',
          to: consultation.email,
          subject: '[Gachigayo] Consultation Cancellation and Refund Confirmation',
          text: userCancelMailText
        };
        await transporter.sendMail(mailOptions);

        // 관리자에게 상담 취소 알림 이메일 전송 (한글)
        const adminCancelMailOptions = {
          from: 'koreaglobalinstitute@gmail.com',
          to: 'koreaglobalinstitute@gmail.com',
          subject: '[Gachigayo] 상담 취소 요청 접수 알림',
          text: `
            안녕하세요, 관리자님.
            
            ${consultation.name} (${consultation.email}) 님의 상담 취소 요청이 접수되었습니다.
            
            [취소된 상담 내역]
            상담 날짜: ${consultation.preferredDate}
            상담 시간: ${consultation.preferredTime}
            취소 사유: ${cancelReason}
            결제 ID: ${consultation.paymentId || '-'}
            환불 상태: ${refund.result.id ? '환불 완료 (ID: ' + refund.result.id + ')' : '환불 처리 중'}
            
            상담 내역을 확인해 주세요.
            
            감사합니다.
            Gachigayo Team
          `
        };
        await transporter.sendMail(adminCancelMailOptions);

        res.json({ success: true, message: 'Consultation cancelled and refunded successfully' });
      } catch (refundError) {
        console.error('Refund error:', refundError);
        res.json({ success: false, error: 'Failed to process refund: ' + refundError.message });
      }
    } else {
      res.json({ success: false, error: 'No payment found to refund' });
    }
  } catch (err) {
    console.error('Cancel error:', err);
    res.json({ success: false, error: err.message });
  }
});

// 쿠폰 생성 함수
function generateCouponCode() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
}

// 상담 완료 처리 API (관리자용)
app.post('/api/consultations/complete', async (req, res) => {
  try {
    // 사용자가 로그인되어 있고 관리자 권한이 있는지 확인
    if (!req.isAuthenticated() || !req.user || req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: '관리자 권한이 필요합니다.' });
    }

    const { consultationId } = req.body;

    // 상담 정보 조회
    const consultation = await db.collection('kgi').findOne({ _id: new ObjectId(consultationId) });
    
    if (!consultation) {
      return res.json({ success: false, error: 'Consultation not found' });
    }

    // 쿠폰 코드 생성
    const couponCode = generateCouponCode();
    const couponExpiryDate = new Date();
    couponExpiryDate.setMonth(couponExpiryDate.getMonth() + 1); // 1개월 유효기간

    // 쿠폰 정보 저장
    await db.collection('coupons').insertOne({
      code: couponCode,
      email: consultation.email,
      discount: 50, // 50% 할인
      isUsed: false,
      createdAt: new Date(),
      expiresAt: couponExpiryDate
    });

    // 상담 상태를 'completed'로 업데이트
    const result = await db.collection('kgi').updateOne(
      { _id: new ObjectId(consultationId) },
      { 
        $set: { 
          status: 'completed',
          completedDate: new Date() 
        } 
      }
    );

    if (result.matchedCount === 0) {
      return res.json({ success: false, error: 'Consultation not found' });
    }

    // 이용자에게 완료 이메일 전송 (쿠폰 정보 포함)
    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: consultation.email,
      subject: 'Consultation Completed - Gachigayo',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Consultation Completed</h2>
          <p>Dear ${consultation.name},</p>
          <p>We are pleased to inform you that your consultation has been completed.</p>
          <p><strong>Consultation Details:</strong></p>
          <ul>
            <li>Date: ${new Date(consultation.preferredDate).toLocaleDateString()}</li>
            <li>Time: ${consultation.preferredTime}</li>
            <li>Platform: ${consultation.platform}</li>
          </ul>
          <p>Thank you for choosing Gachigayo for your consultation. We hope our service was helpful to you.</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; margin: 20px 0; border-radius: 5px;">
            <h3 style="color: #28a745; margin-top: 0;">Special Offer!</h3>
            <p>As a token of our appreciation, we're offering you a 50% discount on your next consultation!</p>
            <p><strong>Your Coupon Code:</strong> <span style="font-size: 1.2em; font-weight: bold; color: #dc3545;">${couponCode}</span></p>
            <p><strong>Valid for:</strong> 1 month from the date of issue.</p>
            <p><em>Note: This coupon is personal and can only be used with your email address.</em></p>
          </div>

          <p>If you have any questions or need further assistance, please don't hesitate to contact us.</p>
          <p>Best regards,<br>Gachigayo Team</p>
        </div>
      `
    };

    await transporter.sendMail(userMailOptions);

    // 관리자에게 상담 완료 알림 이메일 전송 (한글)
    const adminCompleteMailOptions = {
      from: 'koreaglobalinstitute@gmail.com',
      to: 'koreaglobalinstitute@gmail.com', // 관리자 이메일 주소
      subject: '[Gachigayo] 상담 완료 알림',
      text: `
        안녕하세요, 관리자님.
        
        ${consultation.name} (${consultation.email}) 님의 상담이 완료되었습니다.
        
        [완료된 상담 내역]
        상담 날짜: ${consultation.preferredDate}
        상담 시간: ${consultation.preferredTime}
        플랫폼: ${consultation.platform}
        
        상담 내역을 확인해 주세요.
        
        감사합니다.
        Gachigayo Team
      `
    };
    await transporter.sendMail(adminCompleteMailOptions);

    res.json({ success: true, message: 'Consultation marked as completed successfully' });
  } catch (err) {
    console.error('Error completing consultation:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 쿠폰 검증 API
app.post('/api/verify-coupon', async (req, res) => {
  try {
    const { code, email } = req.body;

    const coupon = await db.collection('coupons').findOne({
      code,
      email,
      isUsed: false,
      expiresAt: { $gt: new Date() }
    });

    if (!coupon) {
      return res.json({ 
        success: false, 
        message: 'Invalid or expired coupon code. Please check the code and try again.' 
      });
    }

    res.json({ 
      success: true, 
      discount: coupon.discount,
      message: 'Coupon is valid! You will receive a 50% discount on your consultation.'
    });
  } catch (err) {
    console.error('Error verifying coupon:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 비밀번호 재설정을 위한 인증코드 저장소
const resetCodes = new Map();

// 비밀번호 재설정 인증코드 발송 API
app.post('/api/send-reset-code', async (req, res) => {
  const { email } = req.body;
  
  try {
    console.log('Attempting to send reset code to:', email);
    
    // 이메일 형식 검증
    if (!email || !email.includes('@')) {
      console.log('Invalid email format:', email);
      return res.json({ success: false, message: 'Invalid email format' });
    }

    // 사용자 존재 여부 확인
    const user = await db.collection('users').findOne({ email });
    if (!user) {
      console.log('No user found with email:', email);
      return res.json({ success: false, message: 'No account found with this email' });
    }

    // 6자리 랜덤 코드 생성
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    console.log('Generated verification code for:', email);
    
    // 이메일 발송
    const mailOptions = {
      from: 'koreaglobalinstitute@gmail.com',
      to: email,
      subject: 'Password Reset Verification Code',
      text: `Your verification code is: ${code}. This code will expire in 5 minutes.`
    };

    console.log('Sending email with options:', mailOptions);
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully to:', email);

    // 코드 저장 (5분 유효)
    resetCodes.set(email, {
      code,
      expires: Date.now() + 5 * 60 * 1000
    });

    res.json({ success: true, message: 'Verification code sent successfully' });
  } catch (error) {
    console.error('Detailed error sending reset code:', error);
    res.json({ success: false, message: 'Failed to send verification code' });
  }
});

// 비밀번호 재설정 API
app.post('/api/reset-password', async (req, res) => {
  const { email, code, newPassword } = req.body;

  try {
    // 저장된 코드 확인
    const savedData = resetCodes.get(email);
    if (!savedData || savedData.code !== code) {
      return res.json({ success: false, message: 'Invalid verification code' });
    }

    // 코드 만료 확인
    if (Date.now() > savedData.expires) {
      resetCodes.delete(email);
      return res.json({ success: false, message: 'Verification code has expired' });
    }

    // 비밀번호 해시화
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 비밀번호 업데이트
    await db.collection('users').updateOne(
      { email },
      { $set: { password: hashedPassword } }
    );

    // 사용된 코드 삭제
    resetCodes.delete(email);

    res.json({ success: true, message: 'Password has been reset successfully' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.json({ success: false, message: 'Failed to reset password' });
  }
});

// 비밀번호 변경 API
app.post('/api/change-password', async (req, res) => {
  try {
    const { email, currentPassword, newPassword } = req.body;
    if (!email || !currentPassword || !newPassword) {
      return res.json({ success: false, message: 'Please fill in all fields.' });
    }
    const user = await db.collection('users').findOne({ email });
    if (!user) {
      return res.json({ success: false, message: 'User not found.' });
    }
    const isValid = await bcrypt.compare(currentPassword, user.password);
    if (!isValid) {
      return res.json({ success: false, message: 'Current password is not correct.' });
    }

    // 새로운 비밀번호가 현재 비밀번호와 같은지 확인
    if (currentPassword === newPassword) {
      return res.json({ success: false, message: 'New password cannot be the same as the current password.' });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    await db.collection('users').updateOne({ email }, { $set: { password: hashed } });
    res.json({ success: true });
  } catch (err) {
    res.json({ success: false, message: 'Failed to change password.' });
  }
});

// 계정 탈퇴 API
app.post('/api/delete-account', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email is required.' 
      });
    }

    // 사용자 존재 여부 확인
    const user = await db.collection('users').findOne({ email });
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found.' 
      });
    }

    // 상담 내역에 삭제 예정일 추가 (1년 후)
    const deletionDate = new Date();
    deletionDate.setFullYear(deletionDate.getFullYear() + 1);

    await db.collection('kgi').updateMany(
      { userAccountEmail: email },
      { 
        $set: { 
          isDeleted: true,
          deletionDate: deletionDate,
          deletedAt: new Date()
        } 
      }
    );

    // 사용자의 쿠폰 삭제
    await db.collection('coupons').deleteMany({ email });

    // 사용자 계정 삭제
    const result = await db.collection('users').deleteOne({ email });

    if (result.deletedCount === 1) {
      res.json({ 
        success: true, 
        message: 'Account deleted successfully. Your consultation history will be kept for 1 year before being permanently deleted.' 
      });
    } else {
      throw new Error('Failed to delete account');
    }
  } catch (error) {
    console.error('Delete account error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'An error occurred while deleting the account.' 
    });
  }
});

// 상담 내역 자동 삭제 스케줄러 (매일 실행)
const scheduleConsultationDeletion = async () => {
  try {
    const now = new Date();
    const result = await db.collection('kgi').deleteMany({
      isDeleted: true,
      deletionDate: { $lte: now }
    });
    
    if (result.deletedCount > 0) {
      console.log(`Deleted ${result.deletedCount} expired consultation records`);
    }
  } catch (error) {
    console.error('Error in consultation deletion scheduler:', error);
  }
};

// 매일 자정에 실행
setInterval(scheduleConsultationDeletion, 24 * 60 * 60 * 1000);

// React 라우트 처리
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'koreaglobalinstitute/kgi/dist/index.html'));
});

// MongoDB 연결 시작
connectDB(); 


