export default function GridContainer({children, title}){

    return (
        <div className="flex flex-row gap-2 w-full flex-wrap p-10 bg-offBlack rounded-3xl">
            {children}
        </div>
    )
}