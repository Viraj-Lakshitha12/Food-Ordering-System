import { useState } from 'react';
import Image from 'next/image';

export default function EditableImage({ initialLink }: { initialLink?: string }) {
    const [link, setLink] = useState<string | undefined>(initialLink);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                const imageDataUrl = reader.result as string;
                setLink(imageDataUrl);
            };

            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            {link && (
                <Image className="rounded-lg w-full h-full mb-1" src={link} width={250} height={250} alt={'avatar'} />
            )}
            {!link && (
                <div className="text-center bg-gray-200 p-4 text-gray-500 rounded-lg mb-1">No image</div>
            )}
            <label>
                <input type="file" className="hidden" onChange={handleImageChange} />
                <span className="block border border-gray-300 rounded-lg p-2 text-center cursor-pointer">
          Change image
        </span>
            </label>
        </>
    );
}
