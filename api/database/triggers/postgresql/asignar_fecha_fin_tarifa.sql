-- trigger para asignar fecha_fin dependiendo de cuánto dure la tarifa del socio
CREATE OR REPLACE FUNCTION asignar_fecha_fin_tarifa()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
    duracion INTEGER;
BEGIN

    -- consulta para sacar la duración de la tarifa
    SELECT t.duracion
    INTO duracion
    FROM tarifas t
    WHERE t.id = NEW.tarifa_id;

    IF duracion IS NOT NULL THEN
        -- se le asigna a la fecha_fin la suma de la fecha_inicio y la duración de la tarifa
        NEW.fecha_fin := NEW.fecha_inicio + (duracion || ' days')::interval;
    END IF;

    RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER trigger_asignar_fecha_fin_tarifa
BEFORE INSERT ON socios_tarifas
FOR EACH ROW
EXECUTE FUNCTION asignar_fecha_fin_tarifa();
