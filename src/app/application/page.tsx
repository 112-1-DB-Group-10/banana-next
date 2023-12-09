"use client";
import { useState } from 'react';

const colleges = ['國立台灣大學', '國立政治大學', '私立大葉大學', '私立文化大學'];

const Application = () => {
  const [name, setName] = useState('');
  const [selectedCollege, setSelectedCollege] = useState('');
  const [collegeYear, setCollegeYear] = useState('');
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [verificationProgress, setVerificationProgress] = useState(0);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleCollegeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCollege(e.target.value);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCollegeYear(e.target.value);
  };

  const handlePictureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setProfilePicture(file);
    }
  };

  const handleSubmit = () => {
    setVerificationProgress((prevProgress) => prevProgress + 25);
  };

  return (
    <div className="container mx-auto p-4 flex justify-between gap-10">
      <div className="w-3/5 space-y-4 relative">
        <div className="border rounded-md shadow-md p-4 space-y-4">
          <h1 className="text-3xl font-bold mb-4">香蕉認證</h1>

          <div className="mb-4">
            <label htmlFor="name" className="block mb-1">
              Name:
            </label>
            <input
              type="text"
              id="name"
              className="border border-gray-300 p-2 rounded-md w-2/3" 
              value={name}
              onChange={handleNameChange}
            />
          </div>

          <div className="mb-4 flex items-center">
            <label htmlFor="college" className="block mb-1 mr-4">
              學校：
            </label>
            <select
              id="college"
              className="border border-gray-300 p-2 rounded-md w-1/3"
              value={selectedCollege}
              onChange={handleCollegeChange}
            >
              <option value="">請選擇學校</option>
              {colleges.map((college) => (
                <option key={college} value={college}>
                  {college}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4 flex items-center">
            <label htmlFor="year" className="block mb-1 mr-4">
              入學年份：
            </label>
            <input
              type="text"
              id="year"
              className="border border-gray-300 p-2 rounded-md w-1/4"
              value={collegeYear}
              onChange={handleYearChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="profilePicture" className="block mb-1">
              上傳認證文件
            </label>
            <input
              type="file"
              id="profilePicture"
              className="border border-gray-300 p-2 rounded-md w-1/3"
              onChange={handlePictureUpload}
            />
          </div>

          <div className="absolute bottom-4 right-4">
            <button
                className="bg-blue-500 text-white py-3 px-5 rounded-md"
                onClick={handleSubmit}
            >
                送出認證
            </button>
        </div>
        </div>
      </div>

      <div className="w-1/3 pl-5 mt-20">
        <div className="flex flex-col justify-center">
          <h2 className="text-lg font-bold mb-2">審核進度</h2>
          <div className="flex items-center">
            <progress
              className="w-full border border-gray-300 rounded-md mr-2"
              value={verificationProgress}
              max="100"
            >
              {verificationProgress}%
            </progress>
            <span>{verificationProgress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Application;
