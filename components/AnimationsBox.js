//? import helpers
import { images } from "@/helpers/images";
//? import components
import Image from "next/image";

function AnimationBox() {
  return (
    <div className="animations-box">
      <div>
        {images.map((image, index) => (
          <Image src={image} width={500} height={500} alt="Animation Images" key={index} className={`image-${index}`} />
        ))}
      </div>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, rerum.</p>
    </div>
  );
}

export default AnimationBox;
