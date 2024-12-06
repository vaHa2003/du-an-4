'use client';

import React, { ReactNode } from 'react';
import Providers from '../../../../redux/provider';
import dynamic from 'next/dynamic';
import { persistor } from '../../../../redux/store';

const PersistGate = dynamic(
    () => import('redux-persist/integration/react').then(mod => mod.PersistGate),
    { ssr: false }
);

interface ReduxRenderProps {
    children: ReactNode;  // Định nghĩa kiểu cho props children
}

export default function ReduxRender({ children }: ReduxRenderProps) {
    return (
        <Providers>
            <PersistGate loading={null} persistor={persistor}>
                {children}
            </PersistGate>
        </Providers>
    );
}
