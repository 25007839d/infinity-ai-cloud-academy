export default function ResourceCard({ resource }) {

  return (

    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">

      <div className="text-5xl">

        📄

      </div>

      <h2 className="mt-5 text-2xl font-bold">

        {resource.title}

      </h2>

      <p className="mt-3 text-slate-400">

        {resource.description}

      </p>

      <div className="mt-5 flex gap-3">

        <span className="rounded-full bg-blue-900 px-3 py-1">

          {resource.type}

        </span>

        <span className="rounded-full bg-slate-800 px-3 py-1">

          {resource.level}

        </span>

      </div>

      <div className="mt-8 flex gap-3">

        <a
          href={resource.view}
          className="rounded-xl bg-blue-600 px-5 py-3"
        >
          View
        </a>

        

      </div>

    </div>

  );

}