import React, { useState, useRef, useEffect } from "react";
import styled, { createGlobalStyle, css, keyframes } from "styled-components";

const accent = "var(--glow, #f7971e)";
const surface = "#161a24";
const border = "rgba(255,255,255,0.07)";
const text = "#eef0f6";
const muted = "#5a6080";
const radius = "16px";
const radiusSm = "10px";
const ffDisplay = "'Cabinet Grotesk', sans-serif";
const ffMono = "'JetBrains Mono', monospace";

const GlobalFonts = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Cabinet+Grotesk:wght@400;500;700;800;900&family=JetBrains+Mono:wght@400;600&display=swap');
`;

const floatIcon = keyframes`
  0%, 100% { transform: translateY(0) rotate(-3deg); }
  50%       { transform: translateY(-5px) rotate(3deg); }
`;
const slotPulse = keyframes`
  from { box-shadow: 0 0 20px color-mix(in srgb, ${accent} 10%, transparent); }
  to   { box-shadow: 0 0 50px color-mix(in srgb, ${accent} 30%, transparent); }
`;
const flickerText = keyframes`
  0%   { opacity: 1; transform: scale(1); }
  50%  { opacity: 0.7; transform: scale(0.96); }
  100% { opacity: 1; transform: scale(1); }
`;
const winnerPop = keyframes`
  0%   { opacity: 0; transform: scale(0.6) rotate(-6deg); }
  70%  { transform: scale(1.08) rotate(2deg); }
  100% { opacity: 1; transform: scale(1) rotate(0); }
`;
const fadeSlideDown = keyframes`
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0); }
`;
const chipPop = keyframes`
  0%   { transform: scale(0.85); }
  60%  { transform: scale(1.1); }
  100% { transform: scale(1); }
`;
const btnPulse = keyframes`
  from { box-shadow: 0 4px 24px color-mix(in srgb, ${accent} 30%, transparent); }
  to   { box-shadow: 0 4px 40px color-mix(in srgb, ${accent} 55%, transparent); }
`;
const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const Root = styled.div`
  font-family: ${ffDisplay};
  color: ${text};
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const HeaderIcon = styled.span`
  font-size: 2.2rem;
  line-height: 1;
  filter: drop-shadow(0 0 12px ${accent});
  animation: ${floatIcon} 3s ease-in-out infinite;
`;

const HeaderTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 900;
  letter-spacing: -0.02em;
  line-height: 1.1;
  color: ${text};
  margin: 0;
`;

const HeaderMeta = styled.p`
  font-size: 0.75rem;
  color: ${muted};
  font-weight: 400;
  margin-top: 2px;
`;

const Slot = styled.div<{ $rolling: boolean; $hasResult: boolean }>`
  background: ${surface};
  border-radius: ${radius};
  min-height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 24px 20px;
  position: relative;
  overflow: hidden;
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle at 50% 0%,
      color-mix(in srgb, ${accent} 8%, transparent) 0%,
      transparent 70%
    );
    pointer-events: none;
  }

  ${({ $rolling }) =>
    $rolling
      ? css`
          border: 1.5px solid color-mix(in srgb, ${accent} 40%, transparent);
          box-shadow:
            0 0 0 1px color-mix(in srgb, ${accent} 20%, transparent),
            0 0 40px color-mix(in srgb, ${accent} 15%, transparent);
          animation: ${slotPulse} 0.16s ease-in-out infinite alternate;
        `
      : css`
          border: 1.5px solid ${border};
        `}

  ${({ $hasResult, $rolling }) =>
    $hasResult &&
    !$rolling &&
    css`
      border: 1.5px solid color-mix(in srgb, ${accent} 50%, transparent);
      box-shadow:
        0 0 0 1px color-mix(in srgb, ${accent} 25%, transparent),
        0 8px 40px color-mix(in srgb, ${accent} 20%, transparent);
    `}
`;

const SlotIdle = styled.span`
  font-size: 0.9rem;
  color: ${muted};
  font-weight: 500;
`;

const SlotRolling = styled.span`
  font-size: 1.8rem;
  font-weight: 900;
  letter-spacing: -0.03em;
  color: ${text};
  animation: ${flickerText} 0.08s ease infinite;
`;

const SlotWinnerLabel = styled.span`
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${accent};
  animation: ${fadeSlideDown} 0.4s ease both;
`;

const SlotWinner = styled.span`
  font-size: 2rem;
  font-weight: 900;
  letter-spacing: -0.03em;
  color: ${text};
  animation: ${winnerPop} 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both;
`;

const Pool = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Chip = styled.span<{ $active: boolean }>`
  padding: 5px 13px;
  border-radius: 100px;
  font-size: 0.78rem;
  font-weight: 600;
  cursor: default;
  transition:
    transform 0.15s ease,
    background 0.2s ease,
    border-color 0.2s ease;

  ${({ $active }) =>
    $active
      ? css`
          background: color-mix(in srgb, ${accent} 25%, ${surface});
          border: 1px solid ${accent};
          color: ${text};
          box-shadow: 0 0 14px color-mix(in srgb, ${accent} 30%, transparent);
          animation: ${chipPop} 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        `
      : css`
          background: color-mix(in srgb, ${accent} 10%, ${surface});
          border: 1px solid color-mix(in srgb, ${accent} 22%, transparent);
          color: color-mix(in srgb, ${accent} 65%, ${text});
          &:hover {
            transform: scale(1.06);
          }
        `}
`;

const PickButton = styled.button<{ $rolling: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 15px 24px;
  border-radius: ${radiusSm};
  border: none;
  cursor: pointer;
  font-family: ${ffDisplay};
  font-size: 1rem;
  font-weight: 800;
  letter-spacing: 0.02em;
  color: #07080c;
  background: linear-gradient(
    135deg,
    ${accent} 0%,
    color-mix(in srgb, ${accent} 70%, #fff) 100%
  );
  box-shadow: 0 4px 24px color-mix(in srgb, ${accent} 35%, transparent);
  transition:
    transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow 0.2s ease,
    opacity 0.2s ease;
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.15) 0%,
      transparent 60%
    );
    pointer-events: none;
  }

  &:hover:not(:disabled) {
    transform: translateY(-2px) scale(1.01);
    box-shadow: 0 8px 36px color-mix(in srgb, ${accent} 45%, transparent);
  }
  &:active:not(:disabled) {
    transform: scale(0.97);
  }
  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
    box-shadow: none;
  }

  ${({ $rolling }) =>
    $rolling &&
    css`
      animation: ${btnPulse} 0.8s ease-in-out infinite alternate;
    `}
`;

const BtnIcon = styled.span`
  font-size: 1.1rem;
`;

const Spinner = styled.span`
  width: 16px;
  height: 16px;
  border: 2.5px solid rgba(0, 0, 0, 0.25);
  border-top-color: rgba(0, 0, 0, 0.7);
  border-radius: 50%;
  animation: ${spin} 0.65s linear infinite;
  flex-shrink: 0;
`;

const HistoryBlock = styled.div`
  border-top: 1px solid ${border};
  padding-top: 16px;
`;

const HistoryLabel = styled.p`
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${muted};
  margin-bottom: 10px;
`;

const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const HistoryItem = styled.span`
  font-family: ${ffMono};
  font-size: 0.78rem;
  color: ${text};
  animation: ${fadeSlideDown} 0.3s ease both;
`;

export type RandomPickerProps = {
  items?: string[];
  title?: string;
  onResult?: (result: string) => void;
};

const RandomPicker: React.FC<RandomPickerProps> = ({
  items = [],
  title = "Pick one",
  onResult,
}) => {
  const [current, setCurrent] = useState<string | null>(null);
  const [rolling, setRolling] = useState(false);
  const [displayItem, setDisplayItem] = useState<string>("");
  const [history, setHistory] = useState<string[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hostRef = useRef<Element | null>(null);

  useEffect(() => {
    try {
      hostRef.current = document.getElementById("rp");
    } catch {
      hostRef.current = null;
    }
  }, []);

  function dispatchResult(result: string) {
    try {
      const win = window as unknown as Record<string, unknown>;
      const host = win["__r2wc_host"] as EventTarget | undefined;
      if (host && typeof host.dispatchEvent === "function") {
        host.dispatchEvent(
          new CustomEvent("picker-result", {
            detail: result,
            bubbles: true,
            composed: true,
          }),
        );
        return;
      }
    } catch {
      /* not available */
    }

    try {
      const el = hostRef.current ?? document.getElementById("rp");
      el?.dispatchEvent(
        new CustomEvent("picker-result", {
          detail: result,
          bubbles: true,
          composed: true,
        }),
      );
    } catch {
      /* nothing we can do */
    }
  }

  function pick() {
    if (!items || items.length === 0 || rolling) return;
    setRolling(true);
    setCurrent(null);

    let ticks = 0;
    const maxTicks = 18 + Math.floor(Math.random() * 10);

    intervalRef.current = setInterval(() => {
      setDisplayItem(items[Math.floor(Math.random() * items.length)]);
      ticks++;

      if (ticks >= maxTicks) {
        clearInterval(intervalRef.current!);
        const result = items[Math.floor(Math.random() * items.length)];
        setDisplayItem(result);
        setCurrent(result);
        setRolling(false);
        setHistory((prev) => [result, ...prev].slice(0, 5));
        onResult?.(result);
        dispatchResult(result);
      }
    }, 80);
  }

  useEffect(
    () => () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    },
    [],
  );

  const isEmpty = !items || items.length === 0;

  return (
    <>
      <GlobalFonts />
      <Root>
        <Header>
          <HeaderIcon>🎰</HeaderIcon>
          <div>
            <HeaderTitle>{title}</HeaderTitle>
            <HeaderMeta>
              {isEmpty ? "No items loaded" : `${items.length} items in pool`}
            </HeaderMeta>
          </div>
        </Header>

        <Slot $rolling={rolling} $hasResult={!!current}>
          {rolling ? (
            <SlotRolling>{displayItem || "..."}</SlotRolling>
          ) : current ? (
            <>
              <SlotWinnerLabel>Winner 🎉</SlotWinnerLabel>
              <SlotWinner>{current}</SlotWinner>
            </>
          ) : (
            <SlotIdle>Press the button to pick</SlotIdle>
          )}
        </Slot>

        {!isEmpty && (
          <Pool>
            {items.map((item, i) => (
              <Chip key={item + i} $active={current === item}>
                {item}
              </Chip>
            ))}
          </Pool>
        )}

        <PickButton
          $rolling={rolling}
          onClick={pick}
          disabled={isEmpty || rolling}
        >
          {rolling ? (
            <>
              <Spinner /> Picking…
            </>
          ) : (
            <>
              <BtnIcon>⚡</BtnIcon> Pick Random
            </>
          )}
        </PickButton>

        {history.length > 0 && (
          <HistoryBlock>
            <HistoryLabel>Recent picks</HistoryLabel>
            <HistoryList>
              {history.map((h, i) => (
                <HistoryItem key={i} style={{ opacity: 1 - i * 0.15 }}>
                  {i === 0 ? "→" : "·"} {h}
                </HistoryItem>
              ))}
            </HistoryList>
          </HistoryBlock>
        )}
      </Root>
    </>
  );
};

export default RandomPicker;
