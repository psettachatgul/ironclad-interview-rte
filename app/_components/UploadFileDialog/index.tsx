'use client';

import React, { MouseEventHandler } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Alert,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import locale from '../../../locale/en-US';
import UploadProgressBar from './UploadProgressBar';
import UploadFileDialogTrigger from './UploadFileDialogTrigger';

export interface UploadFileDialogPropTypes {

  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpload: () => void;
  handleCancel: MouseEventHandler<HTMLButtonElement>;
  open: boolean;
  setOpen: (open: boolean) => void;
  isUploading: boolean;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  selectedFile: File | null;
  setSelectedFile: (file: File | null) => void;
  fileName: string;
  setFileName: (name: string) => void;
  percentComplete: number,

}

const UploadFileDialog = (props: UploadFileDialogPropTypes) => {

  const {
    handleFileChange,
    handleUpload,
    handleCancel,
    open,
    setOpen,
    isUploading,
    fileInputRef,
    selectedFile,
    fileName,
    setFileName,
    percentComplete,
  } = props;

  return (
    <>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{locale.uploadFileDialog.title}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            {/* File Upload Input */}
            <Box>
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                accept=".json"
                required
              />
              <Button
                variant="outlined"
                startIcon={<CloudUploadIcon />}
                onClick={() => fileInputRef.current?.click()}
                fullWidth
                sx={{
                  textTransform: 'none',
                  justifyContent: 'flex-start',
                  py: 1.5,
                }}
              >
                {selectedFile
                  ? `${locale.uploadFileDialog.selectedFile} ${selectedFile.name}`
                  : locale.uploadFileDialog.chooseFile}
              </Button>
            </Box>

            {/* Log File Name Input */}
            <TextField
              label={locale.uploadFileDialog.fileLabel}
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              fullWidth
              placeholder={locale.uploadFileDialog.filePlaceholder}
              variant="outlined"
              required
            />
          </Box>
          {isUploading && (
            <>
              <Alert severity="info" sx={{ mt: 1 }}>
                {locale.uploadFileDialog.loadingMessage}
              </Alert>
              <UploadProgressBar
                progress={percentComplete}
                isVisible={isUploading}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCancel}
            disabled={isUploading}
          >
            {locale.uploadFileDialog.cancel}
          </Button>
          <Button
            onClick={handleUpload}
            variant="contained"
            color="primary"
            disabled={!selectedFile || !fileName || isUploading}
            loading={isUploading}
          >
            {isUploading ? locale.uploadFileDialog.uploading : locale.uploadFileDialog.upload}
          </Button>
        </DialogActions>
      </Dialog>
      <UploadFileDialogTrigger />
    </>
  );
};

export default UploadFileDialog;
