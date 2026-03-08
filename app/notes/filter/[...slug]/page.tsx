import { getNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import css from '@/components/NoteList/NoteList.module.css';

type Props = {
    params: Promise<{ slug: string[] }>;
};

const NotesByCategory = async ({ params }: Props) => {
    const { slug } = await params;

    const category = slug?.[0] === 'all' ? undefined : slug?.[0];

    const response = await getNotes(category);

    console.log('Server log:', response);

    return (
        <div>
            <h1 className={css.title}>Notes List</h1>
            {response?.notes?.length > 0 ? (
                <NoteList notes={response.notes} />
            ) : (
                <p>No notes found in this category.</p>
            )}
        </div>
    );
};

export default NotesByCategory;