import Link from "next/link";
import Image from "next/image";

function ProductHuntLaunchSupport() {
  return (
    <div
      className={`flex h-16 items-center justify-center gap-3 bg-cyan-400 px-2 font-semibold text-black transition-all`}
    >
      <div>
        <Image
          src="/images/product_hunt_kitty.png"
          alt="product hunt kitty logo"
          className="w-10 rounded-full "
          width={60}
          height={60}
        />
      </div>
      Support us: Smart Lead Magnet to convert your website into lead generation machine.
      <Link href="https://www.producthunt.com/posts/smart-lead-magnet" target="_blank" className="font-bold">
        Learn more
      </Link>
    </div>
  );
}

export default ProductHuntLaunchSupport;