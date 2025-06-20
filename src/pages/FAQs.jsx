import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";

const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const questions = [
    {
      question: "What is LetUsCook?",
      answer: "LetUsCook is a platform that connects homecooks with users who want to enjoy fresh, home-cooked meals. Cooks can upload meals, and customers can pre-order them easily."
    },
    {
      question: "Do I need an account to order meals?",
      answer: "Yes, creating an account allows you to place orders, track them, and leave reviews for the meals you've received."
    },
    {
      question: "How does ordering work?",
      answer: "Browse the meals page, choose what you like, and place a pre-order. The cook will prepare and deliver your meal at the specified time."
    },
    {
      question: "Who delivers the meals?",
      answer: "Meals are delivered directly by the cook who prepared them, giving you a fresh and personal experience."
    },
    {
      question: "What kind of meals are available?",
      answer: "LetUsCook features a wide variety of home-cooked meals including local dishes, healthy options, snacks, and desserts prepared by passionate homecooks."
    },
    {
        question: "Are meals freshly prepared?",
        answer: "Yes, all meals on LetUsCook are freshly prepared by home or independent cooks based on your order to ensure quality and taste."
      },
    {
      question: "What payment methods can I use?",
      answer: "You can pay using online payment methods or choose Cash on Delivery (COD) during checkout—whatever is more convenient for you."
    },
    {
      question: "Can I leave a review after my meal?",
      answer: "Yes! You can rate and review the meal and cook after your order has been delivered to help others and support the cooks."
    },
    {
      question: "How can I become a cook on LetUsCook?",
      answer: "Sign up , complete your profile, and submit your meals. Once approved by the admin, your meals will be visible for users to pre-order."
    },
    {
      question: "Can I update my meals later?",
      answer: "Yes, you can easily update your meal details, prices, and images anytime through your cook dashboard."
    },
    {
      question: "Do cooks handle their own deliveries?",
      answer: "Yes, cooks are responsible for delivering the meals they prepare at the time specified during the order process."
    },
    {
        question: "Is there a minimum order amount?",
        answer: "Minimum order amounts may vary by cook. Check the meal details or cook’s profile to see if a minimum applies."
    }
  ];
  

  return (
    <>
      <section className='h-[40vh] lg:h-[55vh] xl:h-[70vh] bg-black text-white text-[140px] font-semibold relative'>
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center'>
          FAQs
          <div className='flex items-center justify-center text-[18px] font-normal'>
            <Link to="/" className='hover:text-yellow-200 cursor-pointer'>Home</Link>
            <IoIosArrowForward className='mx-2' />
            <div className='text-yellow-200'>FAQs</div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h6 className="text-lg text-yellow-600 font-medium mb-2">FAQs</h6>
            <h2 className="text-4xl font-manrope font-bold text-gray-900 dark:text-white leading-[3.25rem]">
              Frequently asked questions
            </h2>
          </div>

          <div className="accordion-group">
            {questions.map((item, idx) => (
              <div
                key={idx}
                className="accordion py-8 px-6 border-b border-gray-200 transition-all duration-500 rounded-2xl hover:bg-indigo-50 dark:hover:bg-gray-700 "
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="accordion-toggle group inline-flex items-center justify-between leading-8 text-gray-900 w-full transition duration-200 text-left hover:text-yellow-700"
                  aria-expanded={activeIndex === idx}
                >
                  <h5 className={`dark:text-white transition-colors duration-200 ${activeIndex === idx ? 'text-yellow-500' : ''}`}>
                    {item.question}
                  </h5>
                  <svg
                    className={`transform transition-transform duration-300 ${
                      activeIndex === idx ? 'rotate-180' : ''
                    } text-gray-500 group-hover:text-indigo-600`}
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.5 8.25L12.4142 12.3358C11.7475 13.0025 11.4142 13.3358 11 13.3358C10.5858 13.3358 10.2525 13.0025 9.58579 12.3358L5.5 8.25"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                {activeIndex === idx && (
                  <div className="mt-4 accordion-content text-base text-gray-900 dark:text-gray-400 leading-6">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQs;
