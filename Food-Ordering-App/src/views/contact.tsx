import React from 'react';

const Contact = () => {
    return (
        <section className="my-2">
            <div className="text-center text-gray-500 font-semibold text-xl">
                <h3>DON'T WASTE TIME</h3>
                <h2 className="font-bold text-red-600 text-4xl italic">Contact</h2>
            </div>
            <div className="flex items-center justify-center my-3">
                <a className="text-black font-bold text-4xl" href={'tel:0111234567'}>
                    011-1234567
                </a>
            </div>

            <figure className="flex justify-center items-center h-[60vh]">
                <iframe
                    className="items-center  rounded-2xl "
                    title="Google Maps"
                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15844.748315477245!2d79.88568169999999!3d6.8681728!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2slk!4v1704369240532!5m2!1sen!2slk"
                    style={{border: '0', width: '50%', height: '100%', filter: 'grayscale(1) invert(1)'}}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </figure>


        </section>
    );
};

export default Contact;
