export const uploadImageToS3 = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/awsS3bucket", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  
  return data
};