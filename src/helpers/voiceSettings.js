import { PIXELS_PER_RANGE } from "../constants/voiceSettings"

const convertPixelsToRange = (pixels) => {
    return (pixels / PIXELS_PER_RANGE).toFixed(2)
}

export { convertPixelsToRange }