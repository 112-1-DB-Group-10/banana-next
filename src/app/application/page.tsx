'use client';

import { useState } from 'react';

const colleges = [
  '國立台灣大學',
  '國立政治大學',
  '私立大葉大學',
  '私立文化大學',
];

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
    <div className="container mx-auto flex justify-between gap-10 p-4">
      <div className="relative w-3/5 space-y-4">
        <div className="space-y-4 rounded-md border p-4 shadow-md">
          <h1 className="mb-4 text-3xl font-bold">香蕉認證</h1>

          <div className="mb-4">
            <label htmlFor="name" className="mb-1 block">
              Name:
            </label>
            <input
              type="text"
              id="name"
              className="w-2/3 rounded-md border border-gray-300 p-2"
              value={name}
              onChange={handleNameChange}
            />
          </div>

          <div className="mb-4 flex items-center">
            <label htmlFor="college" className="mb-1 mr-4 block">
              學校：
            </label>
            <select
              id="college"
              className="w-1/3 rounded-md border border-gray-300 p-2"
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
            <label htmlFor="year" className="mb-1 mr-4 block">
              入學年份：
            </label>
            <input
              type="text"
              id="year"
              className="w-1/4 rounded-md border border-gray-300 p-2"
              value={collegeYear}
              onChange={handleYearChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="profilePicture" className="mb-1 block">
              上傳認證文件
            </label>
            <input
              type="file"
              id="profilePicture"
              className="w-1/3 rounded-md border border-gray-300 p-2"
              onChange={handlePictureUpload}
            />
          </div>

          <div className="absolute bottom-4 right-4">
            <button
              className="rounded-md bg-blue-500 px-5 py-3 text-white"
              onClick={handleSubmit}
            >
              送出認證
            </button>
          </div>
        </div>
      </div>

      <div className="mt-20 w-1/3 pl-5">
        <div className="flex flex-col justify-center">
          <h2 className="mb-2 text-lg font-bold">審核進度</h2>
          <div className="flex items-center">
            <progress
              className="mr-2 w-full rounded-md border border-gray-300"
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
