import { useState, useEffect, MouseEvent } from 'react';
import styles from "@public/styles/Learning/codeDev.module.css";
import Button from "../component/globalControl/btnComponent";

const CodeDev: React.FC = () => {
    const [html, setHtml] = useState<string>('');
    const [css, setCss] = useState<string>('');
    const [js, setJs] = useState<string>('');
    const [activeTab, setActiveTab] = useState('html');
    const [htmlLines, setHtmlLines] = useState<number[]>([]);
    const [cssLines, setCssLines] = useState<number[]>([]);
    const [jsLines, setJsLines] = useState<number[]>([]);
    // const [width, setWidth] = useState<string>('30%');

    // Hàm chạy mã
    const runCode = () => {
        const output = document.getElementById('output') as HTMLIFrameElement;
        const outputDocument = output?.contentDocument || output?.contentWindow?.document;

        if (outputDocument) {
            outputDocument.open();
            outputDocument.write(`
                <style>${css}</style>
                ${html}
                <script>${js}<\/script>
            `);
            outputDocument.close();
        }
    };

    useEffect(() => {
        runCode();
    }, [html, css, js]);

    const clearCode = () => {
        setHtml('');
        setCss('');
        setJs('');
        setActiveTab('html');
    };

    const countLines = (text: string) => {
        return text.split('\n').length;
    };

    useEffect(() => {
        setHtmlLines(Array.from({ length: countLines(html) }, (_, i) => i + 1));
        setCssLines(Array.from({ length: countLines(css) }, (_, i) => i + 1));
        setJsLines(Array.from({ length: countLines(js) }, (_, i) => i + 1));
    }, [html, css, js]);


    return (

        <div className={styles.containerDev}>
            <ul className={styles.nav}>
                <li
                    className={`${styles.itemNav} ${activeTab === 'html' ? styles.itemNavActed : ''}`}
                    onClick={() => setActiveTab('html')}
                    style={{ zIndex: activeTab === 'html' ? 1 : 0 }}
                >
                    HTML
                </li>
                <li
                    className={`${styles.itemNav} ${activeTab === 'css' ? styles.itemNavActed : ''}`}
                    onClick={() => setActiveTab('css')}
                    style={{ zIndex: activeTab === 'css' ? 1 : 0 }}
                >
                    CSS
                </li>
                <li
                    className={`${styles.itemNav} ${activeTab === 'js' ? styles.itemNavActed : ''}`}
                    onClick={() => setActiveTab('js')}
                    style={{ zIndex: activeTab === 'js' ? 1 : 0 }}
                >
                    JS
                </li>
            </ul>

            <div className={styles.boxText} style={{
                display: activeTab === 'html' ? 'block' : 'none',
                zIndex: activeTab === 'html' ? 1 : 0,
            }}>
                <div className={styles.boxTextContent}>
                    <div className={styles.lines}>
                        {htmlLines.map(line => (
                            <span key={line} style={{ marginRight: '5px' }}>{line}</span>
                        ))}
                    </div>
                    <textarea
                        className={styles.textCode}
                        placeholder="Nhập HTML ở đây..."
                        value={html}
                        onChange={(e) => setHtml(e.target.value)}
                    />
                </div>
            </div>

            <div className={styles.boxText} style={{
                display: activeTab === 'css' ? 'block' : 'none',
                zIndex: activeTab === 'css' ? 1 : 0,
            }}>
                <div className={styles.boxTextContent}>
                    <div className={styles.lines}>
                        {cssLines.map(line => (
                            <span key={line} style={{ marginRight: '5px' }}>{line}</span>
                        ))}
                    </div>
                    <textarea
                        className={styles.textCode}
                        placeholder="Nhập CSS ở đây..."
                        value={css}
                        onChange={(e) => setCss(e.target.value)}
                    />
                </div>
            </div>

            <div className={styles.boxText} style={{
                display: activeTab === 'js' ? 'block' : 'none',
                zIndex: activeTab === 'js' ? 1 : 0,
            }}>
                <div className={styles.boxTextContent}>
                    <div className={styles.lines}>
                        {jsLines.map(line => (
                            <span key={line} style={{ marginRight: '5px' }}>{line}</span>
                        ))}
                    </div>
                    <textarea
                        className={styles.textCode}
                        placeholder="Nhập JavaScript ở đây..."
                        value={js}
                        onChange={(e) => setJs(e.target.value)}
                    />
                </div>
            </div>

            <div className={styles.cta}>
                <Button type="disable" status="noBorder" size="S" leftIcon={false} rightIcon={false} height={32} onClick={clearCode}>Xóa</Button>
            </div>

            <iframe
                id="output"
                className={styles.showResult}
            />
        </div>

    );
};

export default CodeDev;
