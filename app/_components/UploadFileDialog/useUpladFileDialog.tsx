'use client';

import React, { useState, useRef, MouseEventHandler } from 'react';
import useAlertContext from '../../_contexts/AlertProvider/useAlertContext';
import { upload } from '@vercel/blob/client';
import locale from '../../../_locale/en-US';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import isNil from 'lodash/isNil';

export const useUpladFileDialog = () => {
  const [open, setOpen] = useState(false);
  const [fileName, setFileName] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [percentComplete, setPercentComplete] = useState(0);
  const setAlert = useAlertContext();

  const queryClient = useQueryClient();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Auto-populate logFileName with the file name if not already set
      if (!fileName) {
        setFileName(file.name);
      }
    }
  };

  const { mutate: handleUpload, isPending: isUploading } = useMutation({
    mutationFn: async () => {

      if (!selectedFile || !fileName) {
        alert(locale.uploadFileDialog.selectFileError);
        return;
      }

      if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'development') {

        await axios.post<{ success: boolean; }>(
          '/api/files/upload-dev',
          selectedFile,
          {
            params: {
              fileName,
            },
            timeout: 15 * 60 * 1000, // 15 minutes timeout for large files
            onUploadProgress: (ev) => {
              const percentCompleted =
                isNil(ev.total) ? 0 : Math.round((ev.loaded * 100) / (ev.total));

              setPercentComplete(percentCompleted);
            },
          },
        );
      } else {

        await upload(
          fileName,
          selectedFile,
          {
            handleUploadUrl: `/api/files/upload?fileName=${encodeURIComponent(fileName)}`,
            access: 'public',
            onUploadProgress: (ev) => {
              setPercentComplete(ev.percentage);
            },
            multipart: true,
          },
        );
      }

    },
    onError: (error) => {
      console.error('Upload error:', error);
      setAlert('error',
        `${locale.uploadFileDialog.uploadError}: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
      setPercentComplete(0);
    },
    onSuccess: async () => {

      /**
       * Invalidate querries
       */

      // Success - close the dialog and reset state
      setSelectedFile(null);
      setPercentComplete(0);
      setFileName('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setOpen(false);
      setAlert('success', locale.uploadFileDialog.uploadSuccess);
    },
  });

  const handleCancel: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    setSelectedFile(null);
    setPercentComplete(0);
    setFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setOpen(false);
  };

  const props = {
    handleFileChange,
    handleUpload: () => { handleUpload(); },
    handleCancel,
    open,
    setOpen,
    isUploading,
    fileInputRef,
    selectedFile,
    setSelectedFile,
    fileName,
    setFileName,
    percentComplete,
    setPercentComplete,
  };


  return props;
};
