import React, { useEffect } from 'react';
import { Row, Col, Card, Button, Typography, Image, Divider, Space } from 'antd';
import { 
  BookOutlined, 
  TeamOutlined, 
  TrophyOutlined, 
  GlobalOutlined, 
  CheckCircleFilled, 
  PhoneFilled, 
  MailFilled,
  CalendarOutlined,
  UserOutlined,
  FileTextOutlined,
  EnvironmentFilled
} from '@ant-design/icons';
import './Homepage.css';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const { Title, Text, Paragraph } = Typography;

const Homepage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1000, // Thời gian animation (ms)
      once: true, // Chỉ chạy animation một lần
    });
  }, []);

  return (
    <div className="english-center-container">
      {/* Header Section */}
      <header className="header-section" data-aos="fade-down">
        <Row justify="space-between" align="middle">
          <Col>
            <div className="logo-container">
              <Title level={2} className="logo">EnglishCenter</Title>
              <Text className="logo-slogan">Master English, Master Your Future</Text>
            </div>
          </Col>
          <Col>
            <Space>
              <Button 
                type="text" 
                className="contact-button"
                icon={<PhoneFilled />}
                onClick={() => navigate('/contact')}
              >
                0123 456 789
              </Button>
              <Button
                type="primary"
                className="login-button"
                onClick={() => navigate('/login')}
              >
                Đăng nhập
              </Button>
            </Space>
          </Col>
        </Row>
      </header>

      {/* Hero Banner */}
      <div className="hero-banner" data-aos="zoom-in">
        <div className="hero-content">
          <Title level={1} className="hero-title">Học Tiếng Anh - Mở Cửa Tương Lai</Title>
          <Paragraph className="hero-text">
            Chương trình đào tạo chất lượng cao với 100% giáo viên bản ngữ
          </Paragraph>
          <Space>
            <Button 
              type="primary" 
              size="large"
              onClick={() => navigate('/courses')}
            >
              Khóa học của chúng tôi
            </Button>
            <Button 
              size="large"
              onClick={() => navigate('/contact')}
            >
              Liên hệ tư vấn
            </Button>
          </Space>
        </div>
      </div>

      {/* Features Section */}
      <div className="section features-section" data-aos="fade-up">
        <Title level={2} className="section-title">Tại sao chọn EnglishCenter?</Title>
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={12} md={6}>
            <Card hoverable className="feature-card" data-aos="flip-left">
              <div className="feature-icon-container">
                <UserOutlined className="feature-icon" />
              </div>
              <Title level={4} className="feature-title">Giáo viên bản ngữ</Title>
              <Text>Đội ngũ giáo viên giàu kinh nghiệm, trình độ cao</Text>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card hoverable className="feature-card" data-aos="flip-left">
              <div className="feature-icon-container">
                <BookOutlined className="feature-icon" />
              </div>
              <Title level={4} className="feature-title">Giáo trình chuẩn quốc tế</Title>
              <Text>Sử dụng giáo trình mới nhất từ Oxford, Cambridge</Text>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card hoverable className="feature-card" data-aos="flip-left">
              <div className="feature-icon-container">
                <TeamOutlined className="feature-icon" />
              </div>
              <Title level={4} className="feature-title">Lớp học nhỏ</Title>
              <Text>Chỉ 8-12 học viên/lớp để đảm bảo chất lượng</Text>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card hoverable className="feature-card" data-aos="flip-left">
              <div className="feature-icon-container">
                <TrophyOutlined className="feature-icon" />
              </div>
              <Title level={4} className="feature-title">Cam kết đầu ra</Title>
              <Text>Hoàn tiền 100% nếu không đạt mục tiêu</Text>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Popular Courses */}
      <div className="section courses-section">
        <div className="section-header">
          <Title level={2} className="section-title">Khóa học nổi bật</Title>
          <Button type="link" onClick={() => navigate('/courses')}>Xem tất cả khóa học</Button>
        </div>
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={12} md={8}>
            <Card 
              hoverable 
              cover={
                <Image
                  src="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGVuZ2xpc2glMjBjbGFzc3xlbnwwfHwwfHx8MA%3D%3D"
                  preview={false}
                  className="course-image"
                />
              }
            >
              <Title level={4}>Tiếng Anh Giao Tiếp</Title>
              <div className="course-meta">
                <Space>
                  <CalendarOutlined />
                  <Text>3 tháng</Text>
                </Space>
                <Space>
                  <UserOutlined />
                  <Text>8-12 học viên</Text>
                </Space>
              </div>
              <Divider />
              <Button block type="primary" onClick={() => navigate('/course/1')}>
                Đăng ký ngay
              </Button>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card 
              hoverable 
              cover={
                <Image
                  src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGVuZ2xpc2glMjBjbGFzc3xlbnwwfHwwfHx8MA%3D%3D"
                  preview={false}
                  className="course-image"
                />
              }
            >
              <Title level={4}>Luyện Thi IELTS</Title>
              <div className="course-meta">
                <Space>
                  <CalendarOutlined />
                  <Text>6 tháng</Text>
                </Space>
                <Space>
                  <UserOutlined />
                  <Text>8-12 học viên</Text>
                </Space>
              </div>
              <Divider />
              <Button block type="primary" onClick={() => navigate('/course/2')}>
                Đăng ký ngay
              </Button>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card 
              hoverable 
              cover={
                <Image
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGVuZ2xpc2glMjBjbGFzc3xlbnwwfHwwfHx8MA%3D%3D"
                  preview={false}
                  className="course-image"
                />
              }
            >
              <Title level={4}>Tiếng Anh Doanh Nghiệp</Title>
              <div className="course-meta">
                <Space>
                  <CalendarOutlined />
                  <Text>3 tháng</Text>
                </Space>
                <Space>
                  <UserOutlined />
                  <Text>8-12 học viên</Text>
                </Space>
              </div>
              <Divider />
              <Button block type="primary" onClick={() => navigate('/course/3')}>
                Đăng ký ngay
              </Button>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Testimonials */}
      <div className="section testimonials-section" data-aos="fade-up">
        <Title level={2} className="section-title">Học viên nói gì về chúng tôi</Title>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={8}>
            <Card className="testimonial-card">
              <div className="testimonial-content">
                <Paragraph className="testimonial-text">
                  "Mình đã học tại EnglishCenter được 6 tháng và cảm thấy tiến bộ rõ rệt. Giáo viên nhiệt tình, phương pháp dạy hiệu quả."
                </Paragraph>
                <div className="testimonial-author">
                  <Image
                    src="https://randomuser.me/api/portraits/women/65.jpg"
                    width={50}
                    height={50}
                    preview={false}
                    className="testimonial-avatar"
                  />
                  <div>
                    <Text strong>Nguyễn Thị Hồng</Text>
                    <Text type="secondary">Học viên IELTS</Text>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card className="testimonial-card">
              <div className="testimonial-content">
                <Paragraph className="testimonial-text">
                  "Môi trường học tập chuyên nghiệp, cơ sở vật chất tốt. Mình đã đạt IELTS 7.5 sau khóa học tại đây."
                </Paragraph>
                <div className="testimonial-author">
                  <Image
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    width={50}
                    height={50}
                    preview={false}
                    className="testimonial-avatar"
                  />
                  <div>
                    <Text strong>Trần Văn Nam</Text>
                    <Text type="secondary">Học viên Giao tiếp</Text>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card className="testimonial-card">
              <div className="testimonial-content">
                <Paragraph className="testimonial-text">
                  "Con tôi rất thích học tại EnglishCenter. Các thầy cô biết cách tạo hứng thú cho trẻ khi học tiếng Anh."
                </Paragraph>
                <div className="testimonial-author">
                  <Image
                    src="https://randomuser.me/api/portraits/women/44.jpg"
                    width={50}
                    height={50}
                    preview={false}
                    className="testimonial-avatar"
                  />
                  <div>
                    <Text strong>Lê Thị Mai </Text>
                    <Text type="secondary">Phụ huynh học viên</Text>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Stats Section */}
      <div className="section stats-section">
        <Row gutter={[16, 16]}>
          <Col xs={12} sm={6}>
            <div className="stat-item">
              <Title level={2}>15+</Title>
              <Text>Năm kinh nghiệm</Text>
            </div>
          </Col>
          <Col xs={12} sm={6}>
            <div className="stat-item">
              <Title level={2}>10,000+</Title>
              <Text>Học viên</Text>
            </div>
          </Col>
          <Col xs={12} sm={6}>
            <div className="stat-item">
              <Title level={2}>98%</Title>
              <Text>Hài lòng</Text>
            </div>
          </Col>
          <Col xs={12} sm={6}>
            <div className="stat-item">
              <Title level={2}>50+</Title>
              <Text>Giáo viên</Text>
            </div>
          </Col>
        </Row>
      </div>

      {/* CTA Section */}
      <div className="section cta-section">
        <Card className="cta-card">
          <Row gutter={[24, 24]} align="middle">
            <Col xs={24} md={12}>
              <div className="cta-content">
                <Title level={2} className="cta-title">
                  Bạn đã sẵn sàng cải thiện tiếng Anh?
                </Title>
                
                <div className="cta-features">
                  <div className="feature-item">
                    <CheckCircleFilled className="feature-icon" />
                    <Text strong>Kiểm tra trình độ miễn phí</Text>
                  </div>
                  <div className="feature-item">
                    <CheckCircleFilled className="feature-icon" />
                    <Text strong>Học thử 1 tuần không tính phí</Text>
                  </div>
                  <div className="feature-item">
                    <CheckCircleFilled className="feature-icon" />
                    <Text strong>Lộ trình học tập cá nhân hóa</Text>
                  </div>
                  <div className="feature-item">
                    <CheckCircleFilled className="feature-icon" />
                    <Text strong>Hỗ trợ 24/7</Text>
                  </div>
                </div>
                
                <Button 
                  type="primary" 
                  size="large"
                  onClick={() => navigate('/contact')}
                >
                  Đăng ký tư vấn ngay
                </Button>
              </div>
            </Col>
            
            <Col xs={24} md={12}>
              <Image
                src="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGVuZ2xpc2glMjBjbGFzc3xlbnwwfHwwfHx8MA%3D%3D"
                preview={false}
                className="cta-image"
                alt="Lớp học tiếng Anh"
              />
            </Col>
          </Row>
        </Card>
      </div>

{/* Contact Info */}
    <div className="section contact-section">
    <Title level={2} className="section-title" style={{ textAlign: 'center', marginBottom: 40 }}>Liên Hệ Với Chúng Tôi</Title>
    
    <Row gutter={[32, 32]} justify="center">
        <Col xs={24} md={12} lg={8}>
        <Card 
            hoverable
            className="contact-card"
            bodyStyle={{ padding: 24 }}
        >
            <div className="contact-card-content">
            <div className="contact-icon-wrapper" style={{ backgroundColor: '#e6f7ff' }}>
                <EnvironmentFilled className="contact-icon" style={{ fontSize: 24, color: '#1890ff' }} />
            </div>
            <Title level={4} style={{ marginTop: 16 }}>Địa Chỉ</Title>
            <Text style={{ fontSize: 16 }}>Tầng 5, Tòa nhà Sunrise, <br/>123 Đường ABC, Quận 1, TP.HCM</Text>
            </div>
        </Card>
        </Col>
        
        <Col xs={24} md={12} lg={8}>
        <Card 
            hoverable
            className="contact-card"
            bodyStyle={{ padding: 24 }}
        >
            <div className="contact-card-content">
            <div className="contact-icon-wrapper" style={{ backgroundColor: '#f6ffed' }}>
                <PhoneFilled className="contact-icon" style={{ fontSize: 24, color: '#52c41a' }} />
            </div>
            <Title level={4} style={{ marginTop: 16 }}>Điện Thoại</Title>
            <Text style={{ fontSize: 16 }}>
                <div>Hotline: <Text strong>0123 456 789</Text></div>
                <div>Văn phòng: <Text strong>028 123 456</Text></div>
            </Text>
            </div>
        </Card>
        </Col>
        
        <Col xs={24} md={12} lg={8}>
        <Card 
            hoverable
            className="contact-card"
            bodyStyle={{ padding: 24 }}
        >
            <div className="contact-card-content">
            <div className="contact-icon-wrapper" style={{ backgroundColor: '#fff2e8' }}>
                <MailFilled className="contact-icon" style={{ fontSize: 24, color: '#fa8c16' }} />
            </div>
            <Title level={4} style={{ marginTop: 16 }}>Email & Giờ Làm Việc</Title>
            <Text style={{ fontSize: 16 }}>
                <div>Email: <Text strong>info@englishcenter.edu.vn</Text></div>
                <div>Thứ 2 - Thứ 6: <Text strong>8:00 - 21:00</Text></div>
                <div>Thứ 7: <Text strong>8:00 - 17:00</Text></div>
            </Text>
            </div>
        </Card>
        </Col>
    </Row>
    
    <div style={{ textAlign: 'center', marginTop: 40 }}>
        <Button 
        type="primary" 
        size="large" 
        icon={<PhoneFilled />}
        onClick={() => window.location.href = 'tel:0123456789'}
        style={{ marginRight: 16 }}
        >
        Gọi Ngay
        </Button>
        <Button 
        size="large" 
        icon={<MailFilled />}
        onClick={() => window.location.href = 'mailto:info@englishcenter.edu.vn'}
        >
        Gửi Email
        </Button>
    </div>
    </div>

      {/* Footer */}
      <footer className="footer">
        <Row justify="space-between" align="middle">
          <Col>
            <Text>&copy; {new Date().getFullYear()} EnglishCenter. All rights reserved.</Text>
          </Col>
          <Col>
            <Space>
              <Button type="text" size="small">Điều khoản</Button>
              <Button type="text" size="small">Chính sách bảo mật</Button>
              <Button type="text" size="small">FAQs</Button>
            </Space>
          </Col>
        </Row>
      </footer>
    </div>
  );
};

export default Homepage;