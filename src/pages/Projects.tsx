import { ProjectItem } from "@/components/ProjectItem";
import { projects } from "@/data/projects";

export default function Projects() {
  return (
    <section className="relative w-full overflow-hidden bg-background px-5 py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col gap-8 border-b border-foreground/15 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">02 / Selected work</p>
            <h2 className="mt-4 max-w-3xl font-sometimesTimes text-5xl leading-[0.9] tracking-tight text-foreground sm:text-7xl md:text-8xl">Redefining limits through digital work.</h2>
          </div>
          <p className="max-w-xs font-mono text-[10px] uppercase leading-relaxed tracking-[0.16em] text-muted-foreground">A living archive of products, platforms, and experiments built with intent.</p>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-12 md:gap-y-24">
          {projects.map((item, index) => (
            <div key={item.id} className={`${index % 3 === 1 ? "md:col-span-5 md:mt-28" : "md:col-span-7"} ${index % 3 === 2 ? "md:col-start-4" : ""}`}>
              <div className="mb-4 flex items-center justify-between border-t border-foreground/15 pt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                <span>0{index + 1} / {item.title}</span>
                <span>{item.tech[0]}</span>
              </div>
              <ProjectItem id={`project${item.id}`} title={item.title} img={item.img} desc={item.desc} link={item.link} tech={item.tech} />
            </div>
          ))}
        </div>

        <div className="mt-20 border-t border-foreground/15 pt-5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Scroll to continue through the archive</div>
      </div>
    </section>
  );
}
