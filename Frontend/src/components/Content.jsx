import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

function Content() {
  const [formData, setFormData] = useState({
    username: '',
    senderName: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    console.log(formData)
    e.preventDefault();
    try {//chage the code acoording to backend
      const response = await fetch('https://musical-fishstick-jj49wg59p575cqr5x-3000.app.github.dev/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log('Email sent successfully');
        setFormData({
          username: '',
          to: '',
          email: '',
          subject: '',
          message: '',
        })
        toast.success('Email Sent successfully');

      } else {
        console.error('Failed to send email',response);
        toast.error('Failed to Sent Email, Try again Later');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error in Sending Email');
      
    }
  };

  return (
    <div className='pt-4 pr-8'>
      <div className="bg-white border border rounded-lg shadow relative m-10">
        <div className="p-6 space-y-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="username"
                  className="text-sm font-medium text-gray-900 block mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  placeholder="Name"
                  required
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="senderName"
                  className="text-sm font-medium text-gray-900 block mb-2"
                >
                  Sender Name
                </label>
                <input
                  type="text"
                  name="to"
                  id="to"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  placeholder="Sender Name"
                  required
                  value={formData.to}
                  onChange={handleChange}
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-900 block mb-2"
                >
                  Sender Email Id
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  placeholder="Email Id"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="subject"
                  className="text-sm font-medium text-gray-900 block mb-2"
                >
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  placeholder="Subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-gray-900 block mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4"
                  placeholder="Enter The Message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 rounded-b">
              <button
                className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                type="submit"
              >
                Send Email
              </button>
            </div>
          </form>
          <ToastContainer/>
        </div>
      </div>
    </div>
  );
}

export default Content;
