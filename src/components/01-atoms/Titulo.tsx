export default function Titulo({ texto }: { texto: string }) {
    return (
      <h2 className="text-2xl font-bold text-blue-500 mb-4 border-b-2 border-blue-500 pb-2">
        {texto}
      </h2>
    );
  }
  