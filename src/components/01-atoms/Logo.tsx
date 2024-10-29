import Image from 'next/image';

export default function Logo() {
    return (
        <div className="flex items-center justify-center rounded-full bg-white w-16 h-16 shadow-custom-inset">
            <Image
                src="/images/logo.png"
                alt="Logo de la plataforma"
                width={49}
                height={49}
                className="rounded-full"
            />
        </div>
    );
}
