import React, { FC, useState, useCallback, useRef } from "react";
import { Button } from "@chakra-ui/react";

interface DragAndDropFileInputProps {
  onFile: (file: File | null) => void;
  [key: string]: any;
}

const DragAndDropFileInput: FC<DragAndDropFileInputProps> = ({
  onFile,
  ...props
}) => {
  const [drag, setDrag] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const dragInHandler = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
      setDrag(true);
    },
    []
  );

  const dragOutHandler = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
      setDrag(false);
    },
    []
  );

  const dropHandler = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDrag(false);

    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      handleFile(event.dataTransfer.files[0]);
      event.dataTransfer.clearData();
    }
  }, []);

  const handleFile = useCallback(
    (file: File) => {
      onFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    },
    [onFile]
  );

  const fileChangeHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        handleFile(event.target.files[0]);
      }
    },
    [handleFile]
  );

  const browseFilesHandler = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const resetHandler = useCallback(() => {
    onFile(null);
    setPreview(null);
  }, [onFile]);

  return (
    <div
      onDragEnter={dragInHandler}
      onDragLeave={dragOutHandler}
      onDragOver={dragInHandler}
      onDrop={dropHandler}
      style={{
        border: "1px solid",
        borderColor: drag ? "#000" : "#fff",
        transition: "border-color 0.3s ease-in-out",
        backgroundColor: drag ? "#f0f0f0" : "#fff",
        padding: "20px",
        textAlign: "center",
      }}
      {...props}
    >
      <input
        ref={fileInputRef}
        type="file"
        onChange={fileChangeHandler}
        style={{ display: "none" }}
      />
      {preview ? (
        <>
          <img
            src={preview}
            alt="preview"
            style={{ width: "100%", height: "auto" }}
          />
          <Button onClick={resetHandler} mt={4}>
            Change File
          </Button>
        </>
      ) : (
        <>
          <p>
            {drag
              ? "Drop the file here..."
              : "Drag 'n' drop a file here, or click the button to select a file"}
          </p>
          <Button onClick={browseFilesHandler} mt={4}>
            Browse Files
          </Button>
        </>
      )}
    </div>
  );
};

export default DragAndDropFileInput;
