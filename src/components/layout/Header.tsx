import Image from 'next/image';

export default function Header() {
  return (
    <header className="bg-[#316d27] text-white px-4 py-3 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Image
            src="/images/logo.svg"
            alt="CookBot"
            width={120}
            height={32}
            className="h-8 w-auto"
            priority
          />
        </div>
      </div>
    </header>
  );
}
