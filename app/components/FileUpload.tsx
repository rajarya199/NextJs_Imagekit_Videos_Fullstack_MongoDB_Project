"use client" 

import {
    // ImageKitAbortError,
    // ImageKitInvalidRequestError,
    // ImageKitServerError,
    // ImageKitUploadNetworkError,
    upload,
} from "@imagekit/next";
import { useRef, useState } from "react";
interface FileUploadprops{
    onSuccess:(res:any)=>void
    onProgress?:(progress:number)=>void
    fileType?:"image"|"video"

}
//  file uploading using ImageKit's Next.js SDK.
const FileUpload = ({onSuccess,onProgress,fileType}:FileUploadprops) => {
    const [progress, setProgress] = useState(0);
    const[uploading,setUploading]=useState(false)
    const[error,setError]=useState<string | null>(null)




    // Create a ref for the file input element to access its files easily
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Create an AbortController instance to provide an option to cancel the upload if needed.

  
    
//optional validation
const validateFile=(file:File)=>{
    if(fileType==="video"){
          if (!file.type.startsWith("video/")) {
        setError("Please upload a valid video file");
      }
    }
          if (file.size > 100 * 1024 * 1024) {
      setError("File size must be less than 100 MB");
    }
    return true;
}


    /**
     * Handles the file upload process.
     *
     * This function:
     * - Validates file selection.
     * - Retrieves upload authentication credentials.
     * - Initiates the file upload via the ImageKit SDK.
     * - Updates the upload progress.
     * - Catches and processes errors accordingly.
     */
   
const handleFileChange=async(e:React.ChangeEvent<HTMLInputElement>)=>{
const file=e.target.files?.[0]
if(!file || !validateFile(file))return
setUploading(true)
setError(null)
try{
 const authRes=await fetch("api/auth/imagekit-auth")
 const auth=await authRes.json()
 const res= await upload({
    file,
                    fileName: file.name, 
        publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
    signature:auth.signature,
      expire:auth.expire,
                token:auth.token,
            
                // Progress callback to update upload progress state
                onProgress: (event) => {
                    if(event.lengthComputable && onProgress){
                          const percent = (event.loaded / event.total) * 100;
            onProgress(Math.round(percent))
                    }
                },

 })
 onSuccess(res)
}
catch(error){
    console.error("upload failed",error)
} finally{
    setUploading(false)
}
}
    return (
        <>
            {/* File input element using React ref */}
            <input type="file" ref={fileInputRef}
            accept={fileType==="video" ?"video/*":"image/*"}
                    onChange={handleFileChange}

            />
                  {uploading && <span>Loading....</span>}


        </>
    );
};

export default FileUpload;