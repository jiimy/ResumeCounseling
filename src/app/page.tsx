import Header from "@/components/header/Header";
import Review from "@/components/reviiew/Review";
import Image from "next/image";
import Link from "next/link";
import s from './main.module.scss';
import SlickSlider from "@/components/slider/SlickSlider";

export default function Home() {
  return (
    <>
      <div className={s.main_page}>
        <Image src={'/img/qrcode.png'} alt="" width={200} height={200} />
        <div className="flex gap-10 justify-around mt-20">
          <a href="https://open.kakao.com/o/smuldEoh" target="_blank">오픈카톡</a>
          <a href="https://discord.gg/vAGCtURE" target="_blank">디스코드</a>
        </div>
      </div>
      <Review type="slide" />
    </>
  );
}
