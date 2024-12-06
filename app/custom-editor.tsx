'use client'

import { CKEditor } from '@ckeditor/ckeditor5-react';

import {
    ClassicEditor,
    AccessibilityHelp,
    Autoformat,
    AutoImage,
    Autosave,
    BlockQuote,
    Bold,
    CKBox,
    CKBoxImageEdit,
    CloudServices,
    Code,
    Essentials,
    FindAndReplace,
    FontBackgroundColor,
    FontColor,
    FontFamily,
    FontSize,
    FullPage,
    GeneralHtmlSupport,
    Highlight,
    HtmlComment,
    HtmlEmbed,
    ImageBlock,
    ImageCaption,
    ImageInline,
    ImageInsert,
    ImageInsertViaUrl,
    ImageResize,
    ImageStyle,
    ImageTextAlternative,
    ImageToolbar,
    ImageUpload,
    Indent,
    IndentBlock,
    Italic,
    Link,
    LinkImage,
    List,
    ListProperties,
    Markdown,
    MediaEmbed,
    Mention,
    PageBreak,
    Paragraph,
    PasteFromMarkdownExperimental,
    PasteFromOffice,
    PictureEditing,
    RemoveFormat,
    SelectAll,
    ShowBlocks,
    SourceEditing,
    SpecialCharacters,
    SpecialCharactersArrows,
    SpecialCharactersCurrency,
    SpecialCharactersEssentials,
    SpecialCharactersLatin,
    SpecialCharactersMathematical,
    SpecialCharactersText,
    Strikethrough,
    Subscript,
    Superscript,
    Table,
    TableCaption,
    TableCellProperties,
    TableColumnResize,
    TableProperties,
    TableToolbar,
    TextPartLanguage,
    TextTransformation,
    TodoList,
    Underline,
    Undo,
    SimpleUploadAdapter,
    EasyImage,
    Image,
    Alignment
} from 'ckeditor5';
import { ExportPdf, ExportWord, ImportWord } from 'ckeditor5-premium-features';

import translations from 'ckeditor5/translations/vi.js';
import premiumFeaturesTranslations from 'ckeditor5-premium-features/translations/vi.js';

import 'ckeditor5/ckeditor5.css';
import 'ckeditor5-premium-features/ckeditor5-premium-features.css';
import useCookie from '@/app/(user-global)/component/hook/useCookie';
import { useEffect, useState } from 'react';


interface CkEditorCustomProps {
    initialData?: string;
    onChange?: (data: string) => void;
}


const CkediterCustom: React.FC<CkEditorCustomProps> = ({ initialData = '', onChange }) => {
    const token = useCookie('token')
    const [editorData, setEditorData] = useState<string>(initialData);
    const tokenImg = process.env.NEXT_PUBLIC_TOKEN_IMAGE

    const handleEditorChange = (_: any, editor: any) => {
        const data = editor.getData();
        setEditorData(data);
        if (onChange) {
            onChange(data);
        }
    };

    useEffect(() => {
        setEditorData(initialData);
    }, [initialData]);
    return (
        <CKEditor
            editor={ClassicEditor}
            data={editorData}
            onChange={handleEditorChange}
            config={{
                licenseKey: tokenImg,
                cloudServices: {
                    tokenUrl: 'https://123319.cke-cs.com/token/dev/35d1d27f0e9e385c53edf0d6b267c2f4b82c737a333c23aec4e4bebc4f8e?limit=10',
                    uploadUrl: 'https://123319.cke-cs.com/easyimage/upload/',
                    webSocketUrl: 'wss://123319.cke-cs.com/ws'
                },
                plugins: [
                    AccessibilityHelp, Autoformat, AutoImage, Autosave, BlockQuote, Bold, CKBox, CKBoxImageEdit,
                    CloudServices, Code, Essentials, FindAndReplace, FontBackgroundColor, FontColor, FontFamily,
                    FontSize, FullPage, GeneralHtmlSupport, Highlight, HtmlComment, HtmlEmbed, ImageBlock,
                    ImageCaption, ImageInline, ImageInsert, ImageInsertViaUrl, ImageResize, ImageStyle, ImageTextAlternative,
                    ImageToolbar, ImageUpload, Indent, IndentBlock, Italic, Link, LinkImage, List, ListProperties, Markdown,
                    MediaEmbed, Mention, PageBreak, Paragraph, PasteFromMarkdownExperimental, PasteFromOffice, PictureEditing,
                    RemoveFormat, SelectAll, ShowBlocks, SourceEditing, SpecialCharacters, SpecialCharactersArrows,
                    SpecialCharactersCurrency, SpecialCharactersEssentials, SpecialCharactersLatin, SpecialCharactersMathematical,
                    SpecialCharactersText, Strikethrough, Subscript, Superscript, Table, TableCaption, TableCellProperties,
                    TableColumnResize, TableProperties, TableToolbar, TextPartLanguage, TextTransformation, TodoList,
                    Underline, Undo, ExportPdf, ExportWord, ImportWord, SimpleUploadAdapter, EasyImage, Image, Alignment,
                ],
                placeholder: 'Nhập câu hỏi vào đây dưới dạng code',
                toolbar: [
                    "bold", "italic", "underline", "strikethrough",
                    "|",
                    "link", "imageUpload", "insertTable", "mediaEmbed",
                    "|",
                    "bulletedList",
                ],
                alignment: {
                    options: ["left", "center", "right", "justify"],
                },
                mediaEmbed: {
                    previewsInData: true,
                },
                image: {
                    toolbar: [
                        "toggleImageCaption", "resizeImage", "imageTextAlternative", "imageStyle:inline", "imageStyle:block", "imageStyle:side"
                    ],
                    resizeUnit: "px",
                    resizeOptions: [{
                        name: 'resizeImage:original',
                        value: null
                    },
                    {
                        name: 'resizeImage:50',
                        value: '50'
                    },
                    {
                        name: 'resizeImage:75',
                        value: '75'
                    }],
                },
                language: {
                    ui: 'vi',
                    content: 'vi'
                },
            }}
        />
    )
}

export default CkediterCustom