export default function Template3({ mref, scale, data }: { mref: any, scale: number, data: ResumeData }) {
  return (
    <div ref={mref} id='t4' className="a4 pdf resume" style={{transform: `scale(${scale})`}}>
      
    </div>
  )
}