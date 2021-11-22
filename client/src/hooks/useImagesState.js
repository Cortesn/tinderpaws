import {useState} from 'react'

const useImagesState = () => {
    const [imgIdx, setImgIdx] = useState(0);

    const prevImg = (imgIdx) => {
        if (imgIdx > 0) {
            setImgIdx(imgIdx - 1);
        }
    };
    
    const nextImg = (images, imgIdx) => {
        if (imgIdx < images.length - 1) {
            setImgIdx(imgIdx + 1);
        }
    };

    return [imgIdx, prevImg, nextImg]
}

export default useImagesState
