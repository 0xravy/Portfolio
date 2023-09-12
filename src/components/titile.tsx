interface Title {
    title: string;
}

export const Title = ({ title }: Title) => {
    return (
        <div className="title-page">
            <span></span>
            <h1>{title}</h1>
        </div>
    );
};
