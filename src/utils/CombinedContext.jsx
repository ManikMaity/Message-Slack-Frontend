function CombinedContext(...providers) {
  return ({ children }) => {
    return providers.reduceRight((accumulator, Provider) => {
      return <Provider>{accumulator}</Provider>;
    }, children);
  };
}

export default CombinedContext;
