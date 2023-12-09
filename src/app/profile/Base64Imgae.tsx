import React from 'react';

interface Base64ImageProps {
  base64String: string;
  width?: string;
  height?: string;
}

const Base64Image: React.FC<Base64ImageProps> = ({ base64String, width, height }) => {
  const [imageUrl, setImageUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    // Function to convert base64 to Blob and generate URL
    const convertBase64ToUrl = () => {
      if (base64String) {
        // Convert base64 string to Blob
        const byteCharacters = atob(base64String);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'image/png' }); // Change type if needed

        // Generate URL from Blob
        const url = URL.createObjectURL(blob);
        setImageUrl(url);
      }
    };

    convertBase64ToUrl();

    return () => {
      // Revoke the URL when component unmounts
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [base64String, imageUrl]);

  if (!imageUrl) {
    return <div>Loading...</div>;
  }

  return <img src={imageUrl} alt="Base64 Image" style={{ width: `${width}px`, height: `${height}px` }} />;
};

export default Base64Image;
