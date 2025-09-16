import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Scissors, 
  Star, 
  Clock, 
  MapPin, 
  Phone, 
  Mail,
  Calendar,
  Users,
  Award,
  ChevronRight,
  Sparkles,
  Heart,
  Zap,
  Shield,
  ArrowRight,
  Play,
  CheckCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const featuresRef = useRef(null);
  const testimonialsRef = useRef(null);
  const ctaRef = useRef(null);

  const [services] = useState([
    {
      name: 'Hair Cut & Style',
      description: 'Professional haircut with modern styling techniques',
      price: 45,
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400',
      category: 'Hair',
      popular: true
    },
    {
      name: 'Hair Color',
      description: 'Expert hair coloring and highlights',
      price: 120,
      image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400',
      category: 'Hair',
      popular: false
    },
    {
      name: 'Beard Trim',
      description: 'Professional beard trimming and shaping',
      price: 25,
      image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3d1?w=400',
      category: 'Beard',
      popular: true
    },
    {
      name: 'Facial Treatment',
      description: 'Deep cleansing and rejuvenating facial',
      price: 80,
      image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=400',
      category: 'Facial',
      popular: false
    }
  ]);

  const [testimonials] = useState([
    {
      name: 'Sarah Johnson',
      text: 'Amazing service! The staff is professional and the results are always perfect.',
      rating: 5,
      service: 'Hair Color',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100'
    },
    {
      name: 'Mike Chen',
      text: 'Best salon in town. Clean, modern, and the stylists really know their craft.',
      rating: 5,
      service: 'Hair Cut',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'
    },
    {
      name: 'Emma Davis',
      text: 'Love coming here! The atmosphere is relaxing and the service is top-notch.',
      rating: 5,
      service: 'Facial Treatment',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100'
    }
  ]);

  const [stats] = useState([
    { number: '500+', label: 'Happy Clients', icon: Heart },
    { number: '5+', label: 'Years Experience', icon: Award },
    { number: '50+', label: 'Expert Stylists', icon: Users },
    { number: '100%', label: 'Satisfaction', icon: Star }
  ]);

  useEffect(() => {
    // Set initial states for professional animations
    gsap.set('.hero-logo', { scale: 0, rotation: -180, opacity: 0 });
    gsap.set('.hero-title', { opacity: 0, y: 100 });
    gsap.set('.hero-subtitle', { opacity: 0, y: 50 });
    gsap.set('.hero-buttons', { opacity: 0, y: 30 });
    gsap.set('.stats-section', { opacity: 0, y: 50 });
    gsap.set('.service-card', { opacity: 0, y: 80, scale: 0.8 });
    gsap.set('.feature-card', { opacity: 0, y: 60, scale: 0.9 });
    gsap.set('.testimonial-card', { opacity: 0, y: 60, scale: 0.9 });
    gsap.set('.cta-content', { opacity: 0, y: 50 });

    // Professional Hero Animation Timeline
    const heroTl = gsap.timeline({ delay: 0.5 });
    heroTl
      .to('.hero-logo', { 
        scale: 1, 
        rotation: 0, 
        opacity: 1, 
        duration: 1.2, 
        ease: 'back.out(1.7)' 
      })
      .to('.hero-title', { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        ease: 'power3.out' 
      }, '-=0.8')
      .to('.hero-subtitle', { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: 'power2.out' 
      }, '-=0.6')
      .to('.hero-buttons', { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        ease: 'power2.out' 
      }, '-=0.4')
      .to('.stats-section', { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: 'power2.out' 
      }, '-=0.2');

    // Subtle floating animation for background elements
    gsap.to('.floating-element', {
      y: 'random(-15, 15)',
      x: 'random(-10, 10)',
      rotation: 'random(-3, 3)',
      duration: 'random(4, 6)',
      ease: 'power1.inOut',
      repeat: -1,
      yoyo: true,
      stagger: 0.3
    });

    // Professional Parallax Background
    gsap.to('.parallax-bg', {
      yPercent: -50,
      ease: 'none',
      scrollTrigger: {
        trigger: 'body',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      }
    });

    // Services Section - Professional Reveal
    ScrollTrigger.create({
      trigger: '.services-section',
      start: 'top 85%',
      end: 'bottom 15%',
      animation: gsap.to('.service-card', {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.15
      })
    });

    // Features Section - Clean Animation
    ScrollTrigger.create({
      trigger: '.features-section',
      start: 'top 85%',
      end: 'bottom 15%',
      animation: gsap.to('.feature-card', {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.2
      })
    });

    // Testimonials Section - Elegant Reveal
    ScrollTrigger.create({
      trigger: '.testimonials-section',
      start: 'top 85%',
      end: 'bottom 15%',
      animation: gsap.to('.testimonial-card', {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.2
      })
    });

    // CTA Section - Professional Entrance
    ScrollTrigger.create({
      trigger: '.cta-section',
      start: 'top 85%',
      end: 'bottom 15%',
      animation: gsap.to('.cta-content', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out'
      })
    });

    // Professional Hover Effects
    gsap.utils.toArray('.service-card, .feature-card, .testimonial-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, { 
          scale: 1.03, 
          y: -8,
          duration: 0.3, 
          ease: 'power2.out' 
        });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, { 
          scale: 1, 
          y: 0,
          duration: 0.3, 
          ease: 'power2.out' 
        });
      });
    });

    // Smooth scroll-based animations
    ScrollTrigger.create({
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        
        // Subtle background parallax
        gsap.set('.parallax-slow', {
          y: progress * -100
        });
        gsap.set('.parallax-medium', {
          y: progress * -150
        });
        gsap.set('.parallax-fast', {
          y: progress * -200
        });
      }
    });

    // Professional section transitions
    ScrollTrigger.create({
      trigger: '.services-section',
      start: 'top 90%',
      end: 'bottom 10%',
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.set('.services-section', {
          scale: 0.98 + (progress * 0.02)
        });
      }
    });

    ScrollTrigger.create({
      trigger: '.features-section',
      start: 'top 90%',
      end: 'bottom 10%',
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.set('.features-section', {
          scale: 0.98 + (progress * 0.02)
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Professional Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="parallax-slow absolute top-32 left-16 w-40 h-40 bg-gradient-to-br from-primary-100/30 to-primary-200/20 rounded-full blur-xl"></div>
        <div className="parallax-medium absolute top-64 right-24 w-32 h-32 bg-gradient-to-br from-secondary-100/30 to-secondary-200/20 rounded-full blur-xl"></div>
        <div className="parallax-fast absolute bottom-64 left-24 w-48 h-48 bg-gradient-to-br from-accent-100/30 to-accent-200/20 rounded-full blur-xl"></div>
        <div className="parallax-slow absolute bottom-32 right-16 w-24 h-24 bg-gradient-to-br from-primary-200/30 to-primary-300/20 rounded-full blur-xl"></div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden pt-24">
        {/* Subtle Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="floating-element absolute top-40 left-20 w-16 h-16 bg-primary-200/20 rounded-full"></div>
          <div className="floating-element absolute top-72 right-32 w-12 h-12 bg-secondary-200/20 rounded-full"></div>
          <div className="floating-element absolute bottom-72 left-32 w-20 h-20 bg-accent-200/20 rounded-full"></div>
          <div className="floating-element absolute bottom-40 right-20 w-14 h-14 bg-primary-300/20 rounded-full"></div>
        </div>

        <div className="container mx-auto px-12 relative z-10 py-16">
          <div className="text-center max-w-7xl mx-auto">
            {/* Logo */}
            <div className="hero-logo w-24 h-24 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-2xl flex items-center justify-center mx-auto mb-16 shadow-lg">
              <Scissors className="w-12 h-12 text-white" />
            </div>

            {/* Main Title */}
            <h1 className="hero-title text-5xl md:text-7xl font-bold text-gray-900 mb-12 leading-tight">
              Welcome to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">
                Bria Salon
              </span>
            </h1>

            {/* Subtitle */}
            <p className="hero-subtitle text-xl md:text-2xl text-gray-600 mb-20 max-w-4xl mx-auto leading-relaxed">
              Experience luxury and style at our modern unisex salon. Professional services, 
              expert stylists, and a relaxing atmosphere await you.
            </p>

            {/* CTA Buttons */}
            <div className="hero-buttons flex flex-col sm:flex-row gap-6 justify-center items-center mb-32">
              <Link 
                to="/services" 
                className="group bg-primary-600 hover:bg-primary-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 flex items-center space-x-3 text-lg shadow-lg hover:shadow-xl"
              >
                <span>View Services</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link 
                to="/book" 
                className="group bg-white hover:bg-gray-50 text-gray-900 font-semibold py-4 px-8 rounded-xl border-2 border-gray-200 hover:border-primary-300 transition-all duration-300 flex items-center space-x-3 text-lg shadow-lg hover:shadow-xl"
              >
                <Calendar className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                <span>Book Appointment</span>
              </Link>
            </div>

            {/* Stats */}
            <div className="stats-section grid grid-cols-2 md:grid-cols-4 gap-16 max-w-4xl mx-auto">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="stat-number w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md">
                      <Icon className="w-8 h-8 text-primary-600" />
                    </div>
                    <div className="stat-number text-3xl font-bold text-gray-900 mb-3">{stat.number}</div>
                    <div className="text-gray-600 font-medium">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="services-section py-32 bg-white relative">
        <div className="container mx-auto px-12">
          <div className="text-center mb-24">
            <div className="inline-flex items-center space-x-2 bg-primary-50 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4" />
              <span>Our Services</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Premium Beauty Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From haircuts to facials, we offer a complete range of beauty and grooming services 
              designed to make you look and feel your absolute best.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="service-card group">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 h-full border border-gray-100">
                  <div className="relative overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {service.popular && (
                      <div className="absolute top-4 left-4">
                        <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
                          <Star className="w-3 h-3 fill-current" />
                          <span>Popular</span>
                        </span>
                      </div>
                    )}
                    <div className="absolute top-4 right-4">
                      <span className="bg-white/90 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                        {service.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{service.name}</h3>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">{service.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary-600">${service.price}</span>
                      <Link 
                        to="/book" 
                        state={{ selectedService: service }}
                        className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-1"
                      >
                        <span>Book Now</span>
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-20">
            <Link 
              to="/services" 
              className="group bg-primary-600 hover:bg-primary-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 inline-flex items-center space-x-3 text-lg shadow-lg hover:shadow-xl"
            >
              <span>View All Services</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="features-section py-32 bg-gray-50 relative">
        <div className="container mx-auto px-12">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-secondary-50 text-secondary-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
              <Shield className="w-4 h-4" />
              <span>Why Choose Us</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Excellence in Every Detail</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We're committed to providing exceptional service and results that exceed your expectations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="feature-card text-center group">
              <div className="w-20 h-20 bg-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Award className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Expert Stylists</h3>
              <p className="text-gray-600 leading-relaxed">
                Our team consists of certified professionals with years of experience in the beauty industry, 
                ensuring you receive the highest quality service.
              </p>
            </div>
            
            <div className="feature-card text-center group">
              <div className="w-20 h-20 bg-secondary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Clock className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Flexible Hours</h3>
              <p className="text-gray-600 leading-relaxed">
                We're open 7 days a week with extended hours to fit your busy schedule, 
                making it convenient for you to look and feel your best.
              </p>
            </div>
            
            <div className="feature-card text-center group">
              <div className="w-20 h-20 bg-accent-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Unisex Services</h3>
              <p className="text-gray-600 leading-relaxed">
                Professional services for both men and women in a comfortable, modern environment 
                designed to make everyone feel welcome and pampered.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section py-32 bg-white relative">
        <div className="container mx-auto px-12">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-accent-50 text-accent-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
              <Heart className="w-4 h-4" />
              <span>Client Reviews</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">What Our Clients Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Don't just take our word for it - hear from our satisfied customers who love our services
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card group">
                <div className="bg-white rounded-2xl p-8 h-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                  <div className="flex items-center mb-6">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                      <p className="text-gray-600 text-sm">{testimonial.service}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-gray-700 italic leading-relaxed">"{testimonial.text}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section py-32 bg-primary-600 relative overflow-hidden">
        <div className="container mx-auto px-12 relative z-10">
          <div className="cta-content text-center text-white max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to Transform Your Look?</h2>
            <p className="text-xl mb-16 opacity-90 leading-relaxed">
              Book your appointment today and experience the Bria Salon difference. 
              Our expert stylists are ready to help you look and feel amazing.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link 
                to="/book" 
                className="group bg-white text-primary-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-xl transition-all duration-300 flex items-center space-x-3 text-lg shadow-lg hover:shadow-xl"
              >
                <Calendar className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                <span>Book Your Appointment</span>
              </Link>
              
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8 text-white/90">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5" />
                  <span>123 Beauty Street</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-5 h-5" />
                  <span>(555) 123-4567</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;