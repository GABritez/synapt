import { useState, useRef, DragEvent } from "react";
import { Edit3, Puzzle, GripVertical, BrainCircuit, RefreshCw, CheckCircle } from "lucide-react";

type DemoMode = "text" | "map";

interface DragItem {
  id: string;
  label: string;
}

const PIECES: DragItem[] = [
  { id: "item-event", label: "Toma de la Bastilla" },
  { id: "item-consequence", label: "Fin del Absolutismo" },
  { id: "item-cause", label: "Crisis Económica" },
];

const SLOTS = [
  { id: "slot-cause", acceptId: "item-cause", label: "CAUSA" },
  { id: "slot-event", acceptId: "item-event", label: "EVENTO" },
  { id: "slot-consequence", acceptId: "item-consequence", label: "CONSECUENCIA" },
];

export function InteractiveDemo() {
  const [mode, setMode] = useState<DemoMode>("text");
  
  // Text Demo State
  const [userInput, setUserInput] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const targetText = "El aprendizaje activo refuerza la memoria.";
  
  // Map Demo State
  const [slotContents, setSlotContents] = useState<Record<string, string | null>>({
    "slot-cause": null,
    "slot-event": null,
    "slot-consequence": null,
  });
  const [dragOverSlot, setDragOverSlot] = useState<string | null>(null);
  
  const draggedItem = useRef<string | null>(null);

  // Text Demo Functions
  const checkText = () => {
    setShowFeedback(true);
  };

  const resetTextDemo = () => {
    setUserInput("");
    setShowFeedback(false);
  };

  const renderFeedback = () => {
    const targetWords = targetText.split(" ");
    const inputWords = userInput.split(" ");

    return targetWords.map((word, i) => {
      if (!inputWords[i]) {
        return (
          <span key={i} className="text-warning bg-warning/10 border-b border-warning px-1 mx-1">
            [{word}]
          </span>
        );
      } else if (inputWords[i] === word || inputWords[i] === word + ".") {
        return (
          <span key={i} className="text-success mx-1">
            {word}
          </span>
        );
      } else {
        return (
          <span key={i} className="text-error bg-error/10 line-through decoration-error mx-1">
            {inputWords[i]}
          </span>
        );
      }
    });
  };

  // Map Demo Functions
  const handleDragStart = (e: DragEvent, itemId: string) => {
    draggedItem.current = itemId;
    (e.target as HTMLElement).style.opacity = "0.5";
  };

  const handleDragEnd = (e: DragEvent) => {
    (e.target as HTMLElement).style.opacity = "1";
    setDragOverSlot(null);
  };

  const handleDragOver = (e: DragEvent, slotId: string) => {
    e.preventDefault();
    setDragOverSlot(slotId);
  };

  const handleDragLeave = () => {
    setDragOverSlot(null);
  };

  const handleDrop = (e: DragEvent, slotId: string) => {
    e.preventDefault();
    setDragOverSlot(null);
    
    if (draggedItem.current) {
      // Remove from previous slot if any
      const newSlotContents = { ...slotContents };
      Object.keys(newSlotContents).forEach((key) => {
        if (newSlotContents[key] === draggedItem.current) {
          newSlotContents[key] = null;
        }
      });
      
      // Add to new slot
      newSlotContents[slotId] = draggedItem.current;
      setSlotContents(newSlotContents);
    }
    
    draggedItem.current = null;
  };

  const handleDropToPieces = (e: DragEvent) => {
    e.preventDefault();
    
    if (draggedItem.current) {
      const newSlotContents = { ...slotContents };
      Object.keys(newSlotContents).forEach((key) => {
        if (newSlotContents[key] === draggedItem.current) {
          newSlotContents[key] = null;
        }
      });
      setSlotContents(newSlotContents);
    }
    
    draggedItem.current = null;
  };

  const resetMap = () => {
    setSlotContents({
      "slot-cause": null,
      "slot-event": null,
      "slot-consequence": null,
    });
  };

  const getMapFeedback = () => {
    const correctCount = SLOTS.filter(
      (slot) => slotContents[slot.id] === slot.acceptId
    ).length;

    const allFilled = Object.values(slotContents).every((v) => v !== null);

    if (correctCount === 3) {
      return (
        <span className="text-success flex items-center justify-center">
          <CheckCircle className="mr-2 w-5 h-5" />
          ¡Estructura Correcta! Has reconstruido la lógica histórica.
        </span>
      );
    } else if (allFilled) {
      return (
        <span className="text-warning">
          Estructura incompleta o incorrecta. Revisa la lógica Causa-Efecto.
        </span>
      );
    }
    return null;
  };

  const getAvailablePieces = () => {
    const placedItems = Object.values(slotContents).filter(Boolean);
    return PIECES.filter((piece) => !placedItems.includes(piece.id));
  };

  const getPieceLabel = (itemId: string) => {
    return PIECES.find((p) => p.id === itemId)?.label || "";
  };

  return (
    <section id="method" className="py-20 bg-surface/50 relative border-t border-border">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">Pruébalo ahora mismo</h2>
          <p className="text-muted-foreground">Elige un modo y experimenta el aprendizaje activo.</p>
        </div>

        {/* Demo Tabs */}
        <div className="flex justify-center mb-8 space-x-2 sm:space-x-4">
          <button
            onClick={() => setMode("text")}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all flex items-center ${
              mode === "text"
                ? "bg-primary text-primary-foreground shadow-[0_0_15px_hsl(var(--primary)/0.5)]"
                : "bg-surface text-muted-foreground hover:bg-surface/80"
            }`}
          >
            <Edit3 className="w-4 h-4 mr-2" />
            Replicación Textual
          </button>
          <button
            onClick={() => setMode("map")}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all flex items-center ${
              mode === "map"
                ? "bg-primary text-primary-foreground shadow-[0_0_15px_hsl(var(--primary)/0.5)]"
                : "bg-surface text-muted-foreground hover:bg-surface/80"
            }`}
          >
            <Puzzle className="w-4 h-4 mr-2" />
            Mapa Rompecabezas
          </button>
        </div>

        {/* Interactive Box */}
        <div className="glass-panel rounded-xl p-6 sm:p-8 border border-primary/30 shadow-lg shadow-primary/10 min-h-[300px]">
          {/* TEXT DEMO */}
          {mode === "text" && (
            <div>
              <div className="mb-4 text-xs font-mono text-primary flex justify-between items-center">
                <span>OBJETIVO: COPIA EL TEXTO EXACTAMENTE</span>
                <span className="text-muted-foreground">Nivel: Introducción</span>
              </div>
              <div className="p-4 bg-background/50 rounded-lg mb-6 border border-border">
                <p className="font-serif text-lg text-muted-foreground italic select-none">
                  {targetText}
                </p>
              </div>

              <div className="relative">
                {!showFeedback ? (
                  <textarea
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    className="w-full bg-transparent text-xl text-foreground font-mono placeholder-muted-foreground/50 focus:outline-none resize-none border-b-2 border-primary pb-2"
                    rows={2}
                    placeholder="Escribe aquí..."
                  />
                ) : (
                  <div className="font-mono text-xl flex flex-wrap gap-1">
                    {renderFeedback()}
                    <button
                      onClick={resetTextDemo}
                      className="mt-4 text-sm text-muted-foreground underline block w-full text-left"
                    >
                      Intentar de nuevo
                    </button>
                  </div>
                )}
              </div>

              <div className="mt-4 flex justify-between items-center text-sm">
                <div className="flex space-x-4">
                  <span className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-success mr-2" />
                    Correcto
                  </span>
                  <span className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-error mr-2" />
                    Error
                  </span>
                </div>
                {!showFeedback && (
                  <button
                    onClick={checkText}
                    className="bg-foreground text-background px-4 py-1 rounded font-bold hover:bg-foreground/90 transition-colors"
                  >
                    Verificar
                  </button>
                )}
              </div>
            </div>
          )}

          {/* MAP DEMO */}
          {mode === "map" && (
            <div>
              <div className="mb-4 text-xs font-mono text-primary flex justify-between items-center">
                <span>OBJETIVO: COMPLETA EL MAPA MENTAL</span>
                <span className="text-muted-foreground">Tema: Revolución Francesa</span>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mt-6">
                {/* Draggable Items */}
                <div className="md:col-span-1">
                  <h4 className="text-sm font-bold text-muted-foreground mb-4 uppercase tracking-wider">
                    Conceptos Clave
                  </h4>
                  <div
                    className="space-y-3 min-h-[150px] p-4 bg-background/30 rounded border border-border border-dashed"
                    onDrop={handleDropToPieces}
                    onDragOver={(e) => e.preventDefault()}
                  >
                    {getAvailablePieces().map((piece) => (
                      <div
                        key={piece.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, piece.id)}
                        onDragEnd={handleDragEnd}
                        className="draggable-item bg-surface p-3 rounded border border-border shadow-md text-foreground text-sm font-medium flex items-center cursor-grab active:cursor-grabbing"
                      >
                        <GripVertical className="w-4 h-4 mr-2 text-muted-foreground" />
                        {piece.label}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
                    Arrastra los conceptos a su rama correspondiente en el mapa mental.
                  </p>
                </div>

                {/* Drop Zones */}
                <div className="md:col-span-2 relative h-[320px] bg-background/50 rounded-xl border border-border overflow-hidden">
                  {/* SVG Connecting Lines */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                    <line x1="50%" y1="50%" x2="25%" y2="25%" stroke="hsl(var(--border))" strokeWidth="2" strokeDasharray="5,5" />
                    <line x1="50%" y1="50%" x2="80%" y2="50%" stroke="hsl(var(--border))" strokeWidth="2" strokeDasharray="5,5" />
                    <line x1="50%" y1="50%" x2="30%" y2="80%" stroke="hsl(var(--border))" strokeWidth="2" strokeDasharray="5,5" />
                  </svg>

                  {/* Central Node */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="w-28 h-28 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center text-center p-2 shadow-[0_0_30px_hsl(var(--primary)/0.2)] backdrop-blur-sm">
                      <div>
                        <BrainCircuit className="w-6 h-6 text-primary mx-auto mb-1" />
                        <span className="text-foreground font-bold text-xs leading-tight block">
                          Revolución
                          <br />
                          Francesa
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Slot: Causa */}
                  <div className="absolute top-4 left-4 w-40 z-10">
                    <div className="flex items-center justify-center mb-1">
                      <span className="text-[10px] bg-background text-muted-foreground px-2 rounded-full border border-border">
                        CAUSA
                      </span>
                    </div>
                    <div
                      onDrop={(e) => handleDrop(e, "slot-cause")}
                      onDragOver={(e) => handleDragOver(e, "slot-cause")}
                      onDragLeave={handleDragLeave}
                      className={`drop-zone h-14 bg-background/80 border-2 border-dashed rounded-lg flex items-center justify-center text-xs font-mono text-center px-2 transition-all ${
                        dragOverSlot === "slot-cause"
                          ? "border-primary bg-primary/20"
                          : slotContents["slot-cause"]
                          ? "border-success bg-success/10"
                          : "border-border text-muted-foreground"
                      }`}
                    >
                      {slotContents["slot-cause"] ? (
                        <span className="text-foreground font-medium">
                          {getPieceLabel(slotContents["slot-cause"])}
                        </span>
                      ) : (
                        "Arrastra aquí"
                      )}
                    </div>
                  </div>

                  {/* Slot: Evento */}
                  <div className="absolute top-1/2 right-4 transform -translate-y-1/2 w-40 z-10">
                    <div className="flex items-center justify-center mb-1">
                      <span className="text-[10px] bg-background text-muted-foreground px-2 rounded-full border border-border">
                        EVENTO
                      </span>
                    </div>
                    <div
                      onDrop={(e) => handleDrop(e, "slot-event")}
                      onDragOver={(e) => handleDragOver(e, "slot-event")}
                      onDragLeave={handleDragLeave}
                      className={`drop-zone h-14 bg-background/80 border-2 border-dashed rounded-lg flex items-center justify-center text-xs font-mono text-center px-2 transition-all ${
                        dragOverSlot === "slot-event"
                          ? "border-primary bg-primary/20"
                          : slotContents["slot-event"]
                          ? "border-success bg-success/10"
                          : "border-border text-muted-foreground"
                      }`}
                    >
                      {slotContents["slot-event"] ? (
                        <span className="text-foreground font-medium">
                          {getPieceLabel(slotContents["slot-event"])}
                        </span>
                      ) : (
                        "Arrastra aquí"
                      )}
                    </div>
                  </div>

                  {/* Slot: Consecuencia */}
                  <div className="absolute bottom-4 left-12 w-40 z-10">
                    <div className="flex items-center justify-center mb-1">
                      <span className="text-[10px] bg-background text-muted-foreground px-2 rounded-full border border-border">
                        CONSECUENCIA
                      </span>
                    </div>
                    <div
                      onDrop={(e) => handleDrop(e, "slot-consequence")}
                      onDragOver={(e) => handleDragOver(e, "slot-consequence")}
                      onDragLeave={handleDragLeave}
                      className={`drop-zone h-14 bg-background/80 border-2 border-dashed rounded-lg flex items-center justify-center text-xs font-mono text-center px-2 transition-all ${
                        dragOverSlot === "slot-consequence"
                          ? "border-primary bg-primary/20"
                          : slotContents["slot-consequence"]
                          ? "border-success bg-success/10"
                          : "border-border text-muted-foreground"
                      }`}
                    >
                      {slotContents["slot-consequence"] ? (
                        <span className="text-foreground font-medium">
                          {getPieceLabel(slotContents["slot-consequence"])}
                        </span>
                      ) : (
                        "Arrastra aquí"
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-center text-sm font-bold min-h-[24px]">
                {getMapFeedback()}
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={resetMap}
                  className="text-sm text-muted-foreground hover:text-foreground underline flex items-center"
                >
                  <RefreshCw className="w-3 h-3 mr-1" />
                  Reiniciar Mapa
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
