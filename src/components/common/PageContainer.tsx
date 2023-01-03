interface PageContainerProps extends React.PropsWithChildren {
    className: string;
}

function PageContainer(props: PageContainerProps) {
    const { className = '', children } = props;
    return (
        <section className={`page-container ${className}`}>
            {children}
        </section>
    );
}

export { PageContainer };
