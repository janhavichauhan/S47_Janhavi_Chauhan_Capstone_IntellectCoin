// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate, Link } from 'react-router-dom';
// import { useAuth0 } from "@auth0/auth0-react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { motion } from 'framer-motion';
// import Navbar from '../LandingPageComponent/Navbar';
// import { CarouselData } from '../../../data/Carouseldata';
// import { faChevronRight, faArrowRight } from '@fortawesome/free-solid-svg-icons';
// import styles from './Login.module.css';
// import './button.css';
// import { useDispatch, useSelector } from 'react-redux';
// import { selectors, login } from '../../redux/authSlice'; 

// const Login = () => {
//     const { loginWithRedirect } = useAuth0();
//     const dispatch = useDispatch();
//     const [error, setError] = useState(null);
//     const [formData, setFormData] = useState({
//         email: '',
//         password: ''
//     });
//     const [currentImage, setCurrentImage] = useState(0);
//     const isAuthenticated = useSelector(selectors);

//     const navigate = useNavigate();

//     const forwardImage = () => {
//         setCurrentImage(currentImage < CarouselData.length - 1 ? currentImage + 1 : 0);
//         fadeInAnimation();
//     };

//     const backwardImage = () => {
//         setCurrentImage(currentImage > 0 ? currentImage - 1 : CarouselData.length - 1);
//         fadeInAnimation();
//     };

//     const fadeInAnimation = () => {
//         const image = document.querySelector(`.${styles.image}`);
//         const titles = document.querySelectorAll(`.${styles.title_below}`);
//         setTimeout(() => {
//             image.style.opacity = 1;
//             titles.forEach(title => (title.style.opacity = 1));
//         }, 100);
//     };

//     useEffect(() => {
//         const interval = setInterval(() => {
//             forwardImage();
//         }, 5000);
//         return () => clearInterval(interval);
//     }, [currentImage]);

//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         if (token) {
//             dispatch(login({ token }));
//             navigate('/home');
//         }
//     }, [dispatch, navigate]);

//     const handleChange = e => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleSubmit = async e => {
//         e.preventDefault();
//         try {
//             const uri = 'http://localhost:4000/api/auth/add';
//             const { data: res } = await axios.post(uri, formData);
//             localStorage.setItem('token', res.data);
//             dispatch(login({ token: res.data, user: res.user }));
//             localStorage.setItem('id', res.user._id);
//             navigate('/home');
//         } catch (error) {
//             console.log(error);
//             if (error.response && error.response.data && error.response.data.error) {
//                 setError(error.response.data.error);
//             } else {
//                 setError('An unexpected error occurred.');
//             }
//         }
//     };

//     return (
//         <>
//             <Navbar />
//             <div className={styles.login_container}>
//                 <div className={styles.left}>
//                     <div onClick={forwardImage} className={styles.forward}>
//                         <FontAwesomeIcon icon={faChevronRight} style={{ height: '30px', width: '30px', marginLeft: '40px' }} />
//                     </div>

//                     <img src={CarouselData[currentImage].img} alt="" className={styles.image} />
//                     <div onClick={backwardImage} className={styles.backward}>
//                         <FontAwesomeIcon icon={faChevronRight} style={{ transform: 'rotate(180deg)', height: '30px', width: '30px' }} />
//                     </div>
//                     {CarouselData.map((data, index) => (
//                         <motion.div
//                             key={index}
//                             className={styles.title_below}
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: 1 }}
//                             transition={{ delay: index * 0.5, duration: 0.5 }}
//                         >
//                             {currentImage === index && (
//                                 <motion.div
//                                     key={index}
//                                     initial={{ opacity: 0 }}
//                                     animate={{ opacity: 1 }}
//                                     transition={{ delay: index * 0.5, duration: 0.5 }}
//                                 >
//                                     {data.title}
//                                 </motion.div>
//                             )}
//                         </motion.div>
//                     ))}
//                 </div>
//                 <div className={styles.login_form_container}>
//                     <div className={styles.left}>
//                         <form className={styles.form_container} onSubmit={handleSubmit}>
//                             <h1 className={styles.heading}>Welcome Back!</h1>
//                             <p className={styles.para1}>Login to Your Account..Let's resume <br /> your journey</p>
//                             <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} ></input>
//                             <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
//                             {error && <div className={styles.error_msg}>{error}</div>}
//                             <button className="btn">Login <FontAwesomeIcon icon={faArrowRight} className='arrow' /></button>
//                             <button type="button" className="login-with-google-btn" onClick={loginWithRedirect}>Sign in with Google</button>
//                             <p className={styles.noaccount}>
//                                 Don't have an account ? <Link to="/signup">Sign up </Link>
//                             </p>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default Login;

import React, { useState, useContext } from 'react';
import { login } from '../../services/services';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        login(formData)
            .then(response => {
                const token = response.data.data;
                localStorage.setItem('token', token);
                setAuth({ token, user: response.data.user });
                navigate('/home'); // Redirect to profile completion page
            })
            .catch(error => {
                alert(error.response.data.message);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder="Email" onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;

