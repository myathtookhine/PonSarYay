import { useCallback, useEffect, useRef, useState } from 'react';
import { Canvas, Image as FabricImage, IText, Textbox, Shadow, Rect } from 'fabric';
import { exportCanvas } from '../../utils/canvasExport.js';
import { createObjectUrlImage, resizeImageToMax } from '../../utils/imageHelpers.js';

const MAX_CANVAS_SIZE = 2000;
const MAX_TEXT_LENGTH = 300;

export function useCanvas() {
  const canvasRef = useRef(null);
  const domCanvasRef = useRef(null);
  const [selectedObject, setSelectedObject] = useState(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const history = useRef({ undo: [], redo: [] });
  const [selectedFontId, setSelectedFontId] = useState(null);
  const [hasImage, setHasImage] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dimmerOpacity, setDimmerOpacity] = useState(0);
  const zoomRef = useRef(1);
  const showToastRef = useRef(null);

  const setShowToast = useCallback(fn => {
    showToastRef.current = fn;
  }, []);

  const positionBackgroundImage = useCallback((canvas, fabricImage) => {
    const canvasWidth = canvas.getWidth();
    const canvasHeight = canvas.getHeight();
    const imgWidth = fabricImage.width || fabricImage._originalElement?.width || canvasWidth;
    const imgHeight = fabricImage.height || fabricImage._originalElement?.height || canvasHeight;

    const scale = Math.min(canvasWidth / imgWidth, canvasHeight / imgHeight) || 1;

    fabricImage.set({
      originX: 'center',
      originY: 'center',
      left: canvasWidth / 2,
      top: canvasHeight / 2,
      scaleX: scale,
      scaleY: scale,
    });
  }, []);

  const saveHistory = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const json = canvas.toJSON();
    if (!json) return;
    history.current.undo.push(json);
    history.current.redo = [];
    setCanUndo(history.current.undo.length > 1);
    setCanRedo(false);
  }, []);

  const initCanvas = useCallback((container, width, height) => {
    if (!container) return;
    if (canvasRef.current) {
      return;
    }
    domCanvasRef.current = container;

    // Create a canvas element managed entirely by Fabric inside the container
    const canvasEl = document.createElement('canvas');
    canvasEl.width = width;
    canvasEl.height = height;
    container.innerHTML = '';
    container.appendChild(canvasEl);

    const canvas = new Canvas(canvasEl, {
      width,
      height,
      backgroundColor: 'transparent',
      preserveObjectStacking: true,
    });

    canvasRef.current = canvas;

    canvas.on('selection:created', e => {
      setSelectedObject(e.selected?.[0] ?? null);
    });
    canvas.on('selection:updated', e => {
      setSelectedObject(e.selected?.[0] ?? null);
    });
    canvas.on('selection:cleared', () => {
      setSelectedObject(null);
    });

    canvas.on('text:changed', opt => {
      const target = opt.target;
      if (!target) return;
      const text = target.text || '';
      if (text.length > MAX_TEXT_LENGTH) {
        target.set('text', text.slice(0, MAX_TEXT_LENGTH));
        canvas.renderAll();
        showToastRef.current?.(`Maximum ${MAX_TEXT_LENGTH} characters allowed.`);
      }
    });

    saveHistory();
  }, [saveHistory]);

  const resizeCanvas = useCallback(() => {
    const el = domCanvasRef.current;
    const canvas = canvasRef.current;
    if (!el || !canvas) return;

    const parent = el.parentElement;
    if (!parent) return;
    const { width, height } = parent.getBoundingClientRect();
    canvas.setDimensions({ width, height });

    // Re-center the background image after resize
    const bg = canvas.getObjects().find(obj => obj.isBackground);
    if (bg) {
      positionBackgroundImage(canvas, bg);
      const dimmer = canvas.getObjects().find(obj => obj.isDimmer);
      if (dimmer) {
        dimmer.set({
          originX: bg.originX,
          originY: bg.originY,
          left: bg.left,
          top: bg.top,
          width: bg.width,
          height: bg.height,
          scaleX: bg.scaleX,
          scaleY: bg.scaleY,
        });
      }
    }

    canvas.renderAll();
  }, [positionBackgroundImage]);

  useEffect(() => {
    window.addEventListener('resize', resizeCanvas);
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (canvasRef.current) {
        canvasRef.current.dispose();
        canvasRef.current = null;
      }
      domCanvasRef.current = null;
      history.current = { undo: [], redo: [] };
      setCanUndo(false);
      setCanRedo(false);
      setSelectedObject(null);
      setHasImage(false);
    };
  }, [resizeCanvas]);

  const loadImage = useCallback(
    async file => {
      if (!file) return;
      setIsLoading(true);
      
      // Give React a tick to mount and render the loading spinner before intensive work blocks the main thread
      await new Promise(resolve => setTimeout(resolve, 50));

      try {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const baseImage = await createObjectUrlImage(file);
        const resized = await resizeImageToMax(baseImage, MAX_CANVAS_SIZE);

        const fabricImage = new FabricImage(resized, {
          isBackground: true,
          selectable: false,
          evented: false,
          hoverCursor: 'default'
        });
        positionBackgroundImage(canvas, fabricImage);

        canvas.clear();
        canvas.add(fabricImage);
        canvas.sendObjectToBack(fabricImage);
        
        canvas.requestRenderAll();
        
        setHasImage(true);
        setUploadError(null);
        
        history.current = { undo: [], redo: [] };
        saveHistory();
      } catch (err) {
        console.error("Error loading image:", err);
        setUploadError("Error loading image. Please try another one.");
      } finally {
        setIsLoading(false);
      }
    },
    [positionBackgroundImage, saveHistory],
  );

  const addTextLayer = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const initialText = 'လက်ရေးလှလှ';
    const measureText = new IText(initialText, { fontSize: 32 });
    const exactWidth = measureText.width + 10; // add a little buffer

    const textbox = new Textbox(initialText, {
      fill: '#ffffff',
      stroke: '#000000',
      strokeWidth: 0,
      fontSize: 28,
      width: exactWidth,
      originX: 'center',
      originY: 'center',
      left: canvas.getWidth() / 2,
      top: canvas.getHeight() / 2,
      splitByGrapheme: true,
      lockScalingFlip: true,
      noScaleCache: false,
    });

    // Disable top/bottom middle handles to prevent vertical-only stretching
    textbox.setControlsVisibility({
      mt: false,
      mb: false,
    });

    // Convert scale transforms into font-size / width changes so text never skews
    textbox.on('scaling', () => {
      const newWidth = Math.round(textbox.width * textbox.scaleX);
      const newFontSize = Math.round(textbox.fontSize * textbox.scaleY);
      textbox.set({
        fontSize: Math.max(8, Math.min(200, newFontSize)),
        width: Math.max(20, newWidth),
        scaleX: 1,
        scaleY: 1,
      });
    });

    canvas.add(textbox);
    canvas.setActiveObject(textbox);
    canvas.renderAll();
    saveHistory();
  }, [saveHistory]);

  const updateSelectedText = useCallback(props => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const active = canvas.getActiveObject();
    if (!active || (!(active instanceof IText) && !(active instanceof Textbox))) return;

    if (props.shadow !== undefined) {
      if (props.shadow && typeof props.shadow === 'object') {
        active.set('shadow', new Shadow(props.shadow));
      } else {
        active.set('shadow', null);
      }
      const rest = { ...props };
      delete rest.shadow;
      active.set(rest);
    } else {
      active.set(props);
    }
    canvas.renderAll();
    saveHistory();
  }, [saveHistory]);

  const bringForward = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const active = canvas.getActiveObject();
    if (!active) return;
    canvas.bringObjectForward(active);
    canvas.renderAll();
    saveHistory();
  }, [saveHistory]);

  const sendBackward = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const active = canvas.getActiveObject();
    if (!active) return;
    canvas.sendObjectBackwards(active);
    // Keep background and dimmer at the bottom
    const bg = canvas.getObjects().find(o => o.isBackground);
    const dimmer = canvas.getObjects().find(o => o.isDimmer);
    if (dimmer) canvas.sendObjectToBack(dimmer);
    if (bg) canvas.sendObjectToBack(bg);
    canvas.renderAll();
    saveHistory();
  }, [saveHistory]);

  const deleteSelected = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const active = canvas.getActiveObject();
    if (!active) return;
    canvas.remove(active);
    canvas.discardActiveObject();
    canvas.renderAll();
    saveHistory();
  }, [saveHistory]);

  const duplicateSelected = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const active = canvas.getActiveObject();
    if (!active) return;

    try {
      const clone = await active.clone();
      clone.set({
        left: (active.left || 0) + 20,
        top: (active.top || 0) + 20,
      });
      canvas.add(clone);
      canvas.setActiveObject(clone);
      canvas.renderAll();
      saveHistory();
    } catch (error) {
      console.error('Error duplicating object:', error);
    }
  }, [saveHistory]);

  const undo = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas || history.current.undo.length <= 1) return;
    
    // The current state is the top of the undo stack
    const current = history.current.undo.pop();
    if (!current) return;
    history.current.redo.push(current);
    
    // The previous state is now the new top of the undo stack
    const previous = history.current.undo[history.current.undo.length - 1];
    if (!previous) return;
    
    try {
      await canvas.loadFromJSON(previous);
      canvas.renderAll();
      setCanUndo(history.current.undo.length > 1);
      setCanRedo(history.current.redo.length > 0);
    } catch (error) {
      console.error('Error undoing:', error);
    }
  }, []);

  const redo = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas || history.current.redo.length === 0) return;
    
    const next = history.current.redo.pop();
    if (!next) return;
    history.current.undo.push(next);
    
    try {
      await canvas.loadFromJSON(next);
      canvas.renderAll();
      setCanUndo(history.current.undo.length > 1);
      setCanRedo(history.current.redo.length > 0);
    } catch (error) {
      console.error('Error redoing:', error);
    }
  }, []);

  const exportAs = useCallback(
    (format = 'png', quality = 0.92, multiplier = 1, filename, triggerDownload = true) => {
      const canvas = canvasRef.current;
      if (!canvas) return null;
      return exportCanvas(canvas, format, quality, multiplier, filename, triggerDownload);
    },
    [],
  );

  const applyFont = useCallback(fontConfig => {
    if (!fontConfig) return;
    setSelectedFontId(fontConfig.id);
    updateSelectedText({ fontFamily: fontConfig.name });
  }, [updateSelectedText]);

  const getBackgroundImageDataUrl = useCallback(() => {
    return new Promise((resolve) => {
      const canvas = canvasRef.current;
      if (!canvas) return resolve(null);

      const bg = canvas.getObjects().find(obj => obj.isBackground);
      if (!bg) return resolve(null);

      const element = bg.getElement();
      if (!element) return resolve(null);

      const width = element.naturalWidth || element.width;
      const height = element.naturalHeight || element.height;
      if (!width || !height) return resolve(null);

      const tmp = document.createElement('canvas');
      tmp.width = width;
      tmp.height = height;
      const ctx = tmp.getContext('2d');
      ctx.drawImage(element, 0, 0, width, height);
      
      tmp.toBlob(blob => {
        if (blob) resolve(URL.createObjectURL(blob));
        else resolve(null);
      }, 'image/png');
    });
  }, []);

  const applyCroppedBackground = useCallback(
    dataUrl => {
      if (!dataUrl || !canvasRef.current) return;
      const image = new Image();
      image.onload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const fabricImage = new FabricImage(image, {
          isBackground: true,
          selectable: false,
          evented: false,
          hoverCursor: 'default'
        });
        positionBackgroundImage(canvas, fabricImage);
        
        canvas.clear();
        canvas.add(fabricImage);
        canvas.sendObjectToBack(fabricImage);
        
        canvas.requestRenderAll();
        setHasImage(true);
        saveHistory();
      };
      image.src = dataUrl;
    },
    [positionBackgroundImage, saveHistory],
  );

  const updateDimmer = useCallback(
    opacity => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const clamped = Math.max(0, Math.min(0.9, Number(opacity) || 0));
      setDimmerOpacity(clamped);

      const bg = canvas.getObjects().find(o => o.isBackground);
      let dimmer = canvas.getObjects().find(o => o.isDimmer);

      if (clamped <= 0) {
        if (dimmer) {
          canvas.remove(dimmer);
          canvas.renderAll();
          saveHistory();
        }
        return;
      }

      if (!dimmer) {
        dimmer = new Rect({
          isDimmer: true,
          selectable: false,
          evented: false,
          hoverCursor: 'default',
          fill: '#000000',
          originX: bg ? bg.originX : 'center',
          originY: bg ? bg.originY : 'center',
          left: bg ? bg.left : canvas.getWidth() / 2,
          top: bg ? bg.top : canvas.getHeight() / 2,
          width: bg ? bg.width : canvas.getWidth(),
          height: bg ? bg.height : canvas.getHeight(),
          scaleX: bg ? bg.scaleX : 1,
          scaleY: bg ? bg.scaleY : 1,
          opacity: clamped,
        });
        canvas.add(dimmer);
      } else {
        if (bg) {
          dimmer.set({
            originX: bg.originX,
            originY: bg.originY,
            left: bg.left,
            top: bg.top,
            width: bg.width,
            height: bg.height,
            scaleX: bg.scaleX,
            scaleY: bg.scaleY,
            opacity: clamped,
          });
        } else {
          dimmer.set({ opacity: clamped });
        }
      }

      // Ensure proper stacking order: bg at back, dimmer right above bg
      canvas.sendObjectToBack(dimmer);
      if (bg) {
        canvas.sendObjectToBack(bg);
      }

      canvas.renderAll();
      saveHistory();
    },
    [saveHistory],
  );

  const createSolidBackground = useCallback(
    (color = '#171717', aspect = '1:1') => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      canvas.clear();

      const canvasWidth = canvas.getWidth();
      const canvasHeight = canvas.getHeight();

      let targetW = 1080;
      let targetH = 1080;
      if (aspect === '4:5') {
        targetW = 1080;
        targetH = 1350;
      } else if (aspect === '9:16') {
        targetW = 1080;
        targetH = 1920;
      } else if (aspect === '16:9') {
        targetW = 1920;
        targetH = 1080;
      }

      const scale = Math.min((canvasWidth * 0.9) / targetW, (canvasHeight * 0.9) / targetH) || 1;

      const bgRect = new Rect({
        isBackground: true,
        selectable: false,
        evented: false,
        hoverCursor: 'default',
        originX: 'center',
        originY: 'center',
        left: canvasWidth / 2,
        top: canvasHeight / 2,
        width: targetW,
        height: targetH,
        scaleX: scale,
        scaleY: scale,
        fill: color,
      });

      canvas.add(bgRect);
      canvas.sendObjectToBack(bgRect);

      setHasImage(true);
      setUploadError(null);
      setDimmerOpacity(0);

      // Add starter text layer so creator can immediately type
      const initialText = 'လက်ရေးလှလှ';
      const textbox = new Textbox(initialText, {
        left: canvasWidth / 2,
        top: canvasHeight / 2,
        originX: 'center',
        originY: 'center',
        fontSize: Math.round(36 * scale),
        fill: color === '#ffffff' || color === '#fafafa' || color === '#f5f5f0' ? '#171717' : '#ffffff',
        fontFamily: selectedFontId || 'MyanmarAngoun',
        textAlign: 'center',
        splitByGrapheme: true,
      });
      canvas.add(textbox);
      canvas.setActiveObject(textbox);

      canvas.requestRenderAll();
      history.current = { undo: [], redo: [] };
      saveHistory();
    },
    [selectedFontId, saveHistory],
  );

  const clearImage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.clear();
    canvas.backgroundColor = 'transparent';
    canvas.renderAll();
    setHasImage(false);
    setDimmerOpacity(0);
    setUploadError(null);
    history.current = { undo: [], redo: [] };
    saveHistory();
  }, [saveHistory]);

  const setZoom = useCallback(
    nextZoom => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const clamped = Math.min(3, Math.max(0.25, nextZoom));
      zoomRef.current = clamped;
      canvas.setZoom(clamped);
      canvas.renderAll();
    },
    [],
  );

  const zoomIn = useCallback(() => {
    setZoom(zoomRef.current * 1.25);
  }, [setZoom]);

  const zoomOut = useCallback(() => {
    setZoom(zoomRef.current / 1.25);
  }, [setZoom]);

  const resetZoom = useCallback(() => {
    setZoom(1);
  }, [setZoom]);

  return {
    initCanvas,
    resizeCanvas,
    loadImage,
    addTextLayer,
    updateSelectedText,
    deleteSelected,
    duplicateSelected,
    undo,
    redo,
    bringForward,
    sendBackward,
    exportAs,
    selectedObject,
    canUndo,
    canRedo,
    selectedFontId,
    applyFont,
    hasImage,
    dimmerOpacity,
    updateDimmer,
    createSolidBackground,
    getBackgroundImageDataUrl,
    applyCroppedBackground,
    clearImage,
    zoomIn,
    zoomOut,
    resetZoom,
    setShowToast,
    uploadError,
    setUploadError,
    isLoading,
  };
}

