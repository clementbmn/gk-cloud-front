export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={'h-full flex flex-col items-center justify-center'}>
      <div className={'h-20 flex flex-1 flex-col items-center justify-center'}>
        <h1 className={'font-bold text-3xl'}>GK Concept Cloud</h1>
      </div>
      {children}
      <div className={'h-20 flex flex-1 items-center justify-center'}/>
    </div>
  )
}
