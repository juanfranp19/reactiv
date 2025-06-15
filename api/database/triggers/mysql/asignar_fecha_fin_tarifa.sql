-- trigger para asignar fecha_fin dependiendo de cuánto dure la tarifa del socio
CREATE OR REPLACE TRIGGER asignar_fecha_fin_tarifa
BEFORE INSERT ON socios_tarifas
FOR EACH ROW
BEGIN
    DECLARE dias_finales INTEGER;
    DECLARE duracion INTEGER;

    -- consulta para sacar la duración de la tarifa
    SELECT t.duracion
    INTO duracion
    FROM tarifas t
    WHERE t.id = NEW.tarifa_id;

    IF duracion IS NOT NULL THEN
        -- se resta un día a la duración para que no de un día de más
        SET dias_finales = duracion - 1;
        -- se le asigna a la fecha_fin la suma de la fecha_inicio y la duración de la tarifa
        SET NEW.fecha_fin = DATE_ADD(NEW.fecha_inicio, INTERVAL dias_finales DAY);

    END IF;
END;
