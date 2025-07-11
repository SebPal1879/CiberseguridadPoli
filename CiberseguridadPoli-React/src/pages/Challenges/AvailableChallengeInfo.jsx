function ChallengeInfo({ children }) {
  return (
    <>
      <div className="curso-breadcrumb">
        <h2>Desafíos disponibles</h2>
      </div>

      <main className="unidades-container">{children}</main>
    </>
  );
}

export default ChallengeInfo;
