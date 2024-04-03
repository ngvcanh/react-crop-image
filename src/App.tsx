// import ImageCropProvider from './CropImageWrapper/Context';
// import ImageCrop from './CropImageWrapper/ImageCrop';

import { CropImageWrapper } from "./Fixed/CropImageWrapper";

function App() {
  return (
    <div className="bg-gray-100 h-screen flex justify-center items-center">
      {/* <ImageCropProvider>
        <ImageCrop />
      </ImageCropProvider> */}
      <CropImageWrapper
        oldImage="https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171_640.jpg"
      />
    </div>
  );
}

export default App;
