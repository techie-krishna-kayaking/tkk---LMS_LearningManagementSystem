import { useMemo } from 'react';

interface Props {
  fullName: string;
  email: string;
  phone: string;
  sessionHint: string;
}

export function ForensicWatermarkOverlay(props: Props) {
  const rows = useMemo(
    () =>
      Array.from({ length: 18 }).map((_, idx) => (
        <div className="watermark-cell" key={idx}>
          {props.fullName} | {props.email} | {props.phone} | {new Date().toLocaleString()} | {props.sessionHint}
        </div>
      )),
    [props.email, props.fullName, props.phone, props.sessionHint],
  );

  return <div className="watermark-grid">{rows}</div>;
}
