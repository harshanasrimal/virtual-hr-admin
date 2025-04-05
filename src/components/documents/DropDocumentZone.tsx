import { useDropzone } from "react-dropzone";
import { useState } from "react";

interface DropDocumentZoneProps {
  onFileSelect: (file: File) => void;
}

const DropDocumentZone: React.FC<DropDocumentZoneProps> = ({ onFileSelect }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setSelectedFile(acceptedFiles[0]);
      onFileSelect(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      "application/pdf": [],
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`transition border border-dashed rounded-xl p-7 lg:p-10 cursor-pointer
        ${isDragActive
          ? "border-brand-500 bg-gray-100 dark:bg-gray-800"
          : "border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900"}`}
    >
      <input {...getInputProps()} />
      <div className="text-center">
        {selectedFile ? (
          <>
            <div className="mb-4">
              <div className="h-16 w-16 mx-auto rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center text-green-600 dark:text-green-300 text-xl">
                ✅
              </div>
            </div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              File Selected
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
              {selectedFile.name}
            </p>
            <span className="mt-2 inline-block text-sm underline text-brand-500">
              Change File
            </span>
          </>
        ) : (
          <>
            <div className="mb-4">
              <div className="h-16 w-16 mx-auto rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-400">
                📄
              </div>
            </div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              {isDragActive ? "Drop file here" : "Drag & drop your document here"}
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Accepts PDF Only. Max 1 file.
            </p>
            <span className="underline font-medium text-brand-500">Browse File</span>
          </>
        )}
      </div>
    </div>
  );
};

export default DropDocumentZone;
