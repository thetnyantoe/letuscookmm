import React from 'react'
import {Link,useLocation} from 'react-router-dom';
const Termsandcondition = () => {
  return (
    <>
    <div className='container mx-auto mt-[30px] md:mt-[70px] '>
      <div className='mx-[10px] md:mx-auto  h-auto  pt-[90px] md:pt-[65px] max-w-[720px] tracking-wide pb-[90px] md:pb-[90px] text-justify'>
        <h1 className=' text-3xl md:text-5xl pb-4 font-bold '>Terms and Conditions</h1>
        <p className='text'>June 5, 2025</p>
        <p className=' pt-20 leading-7 text'>Welcome to LetUsCook ("we," "our," or "us"). By accessing or using our website, services, or applications (collectively the "Platform"), you agree to be bound by the following terms and conditions. Please read them carefully before proceeding.</p> <br />

        <h1 className='text-[28px] font-medium'>User Accounts</h1>
        <p className='text'>To use certain features of LetUsCook, you must register for an account. You agree to provide accurate and complete information during the registration process and to update such information as needed. You are responsible for maintaining the confidentiality of your account credentials and are fully responsible for all activities that occur under your account.</p> <br />

        <h1 className='text-[28px] font-medium'>Cook Responsibilities</h1>
        <p className='text'>Cooks are expected to provide honest, hygienic, and freshly prepared meals. By listing meals on the Platform, you agree to deliver them in a timely manner and ensure that all ingredients and preparation methods meet local health regulations. Repeated complaints or delays may result in suspension or removal from LetUsCook.</p> <br />

        <h1 className='text-[28px] font-medium'>Ordering and Delivery</h1>
        <p className='text'>Users can browse, pre-order meals, and choose between online payment or cash on delivery. Cooks handle deliveries themselves, and LetUsCook provides oversight to ensure smooth transactions. Delivery times and order statuses will be communicated via the platform. Please report any issues within 24 hours of expected delivery time.</p> <br />

        <h1 className='text-[28px] font-medium'>Payments</h1>
        <p className='text'>We support secure payment methods, including online payments and cash on delivery. Payment is required at the time of ordering unless specified otherwise. LetUsCook may charge a small platform fee to sustain operational costs. All transactions are subject to applicable taxes and fees.</p>
<br />

        <h1 className='text-[28px] font-medium'>Intellectual Property</h1>
        <p className='text'>All content, branding, logos, designs, and software on LetUsCook are owned by us or our licensors. Unauthorized use of any intellectual property without express written consent is prohibited. User-submitted images and content must not infringe on third-party rights.</p>
<br />
        <h1 className='text-[28px] font-medium'>Limitation of Liability</h1>
        <p className='text'>LetUsCook acts as a facilitator between users and cooks. We are not liable for any food-related health issues, delays, or cook misconduct. We will, however, take prompt action to resolve disputes. Our total liability in any matter arising out of or related to the Platform is limited to the amount paid by the user during the previous 30 days.</p>
<br />
        <h1 className='text-[28px] font-medium'>Changes to Terms</h1>
        <p className='text'>We reserve the right to modify these terms at any time. Continued use of the Platform after changes constitutes acceptance of the new terms. We recommend reviewing this page periodically to stay informed of any updates.</p>
<br />
        <h1 className='text-[28px] font-medium'>Contact Us</h1>
        <p className='text'>If you have any questions or concerns about these Terms and Conditions, please reach out to us at</p><Link to="/contactus" className='text-yellow-200 hover:underline'>support@letuscook.com</Link>
      </div>
    </div>
    </>
  )
}

export default Termsandcondition
