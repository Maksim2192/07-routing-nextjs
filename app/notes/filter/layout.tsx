import css from "../page.module.css";
type Props = {
    children: React.ReactNode;
    sidebar: React.ReactNode;
};
const NotesLayout = ({ children, sidebar }: Props) => {
    return (
        <section className={css.section}>
            <aside>{sidebar}</aside>
            <div>{children}</div>
        </section>
    );
};

export default NotesLayout;