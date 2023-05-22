import Image from "next/image";

import Logo from "../assets/nlw-spacetime-logo.svg";
import Link from "next/link";

export function Hero() {
  return (
    <div className="space-y-5">
      <Image src={Logo} alt="Nlw Spacetime Logo" />

      <div className="max-w-[420px] space-y-1">
        <h1 className="font-bold text-5xl text-gray-50 leading-tight">
          Sua cápsula do tempo
        </h1>

        <p className="text-lg leading-relaxed">
          Colecione momentos marcantes da sua jornada e compartilhe (se quiser)
          com o mundo!
        </p>
      </div>

      <Link
        href="/memories/new"
        className="inline-block px-5 py-3 bg-green-500 rounded-full font-alt text-sm text-black uppercase leading-none hover:bg-green-600 transition-colors"
      >
        Cadastrar Lembrança
      </Link>
    </div>
  );
}
