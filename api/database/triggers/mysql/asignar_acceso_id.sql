-- trigger para asignar acceso_id a la tabla de seguimientos al crear seguimiento
CREATE OR REPLACE TRIGGER asignar_acceso_id
BEFORE INSERT ON seguimientos
FOR each ROW
BEGIN
    DECLARE _acceso_id BIGINT;

    -- consulta para sacar el id del acceso que coincide con el socio_id y la fecha
    SELECT a.id
    INTO _acceso_id
    FROM accesos a
    WHERE a.socio_id = NEW.socio_id
        AND DATE(a.hora_entrada) = NEW.fecha
    LIMIT 1;

    IF _acceso_id IS NOT NULL THEN
        -- lo asigna
        SET NEW.acceso_id = _acceso_id;
    END IF;

END;
