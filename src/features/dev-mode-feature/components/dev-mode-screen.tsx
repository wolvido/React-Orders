import { ApiSelectionScreen } from "@/src/shared/lib/api/api-selection-screen";

interface DevModeScreenProps {
    setDisplayDevModeScreen: (show: boolean) => void;
}

export const DevModeScreen = ({
    setDisplayDevModeScreen
}: DevModeScreenProps) => {

    return(
        <ApiSelectionScreen
            setDisplaySelectionScreen={setDisplayDevModeScreen}
        />
    );
}

