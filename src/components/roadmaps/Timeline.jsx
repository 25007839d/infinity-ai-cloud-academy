export default function Timeline({ steps }) {
  return (
    <div className="relative mt-8">

      {steps.map((step, index) => (
        <div
          key={step}
          className="relative flex items-start gap-5 pb-8"
        >
          <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold">
            {index + 1}
          </div>

          {index !== steps.length - 1 && (
            <div className="absolute left-5 top-10 h-full w-0.5 bg-slate-700"></div>
          )}

          <div className="pt-1">
            <h3 className="text-lg font-semibold">
              {step}
            </h3>
          </div>
        </div>
      ))}

    </div>
  );
}