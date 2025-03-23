import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface FileType {
  _id: string;
  filename: string;
  originalName: string;
  mimetype: string;
  size: number;
  uploadDate: string;
}

interface FilesState {
  files: FileType[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: FilesState = {
  files: [],
  status: 'idle',
  error: null,
};

export const fetchFiles = createAsyncThunk('files/fetchFiles', async () => {
  const response = await fetch('http://localhost:3000/api/files');
  return response.json();
});

export const uploadFile = createAsyncThunk('files/uploadFile', async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await fetch('http://localhost:3000/api/upload', {
    method: 'POST',
    body: formData,
  });
  return response.json();
});

const filesSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFiles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFiles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.files = action.payload;
      })
      .addCase(fetchFiles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.files.unshift(action.payload);
      });
  },
});

export default filesSlice.reducer;