-- trigger para asignar acceso_id a la tabla de seguimientos al crear seguimiento
CREATE OR REPLACE FUNCTION asignar_acceso_id()
RETURNS trigger
LANGUAGE plpgsql
AS $$
DECLARE
    _acceso_id BIGINT;
BEGIN

    -- consulta para sacar el id del acceso que coincide con el socio_id y la fecha
    SELECT a.id
    INTO _acceso_id
    FROM accesos a
    WHERE a.socio_id = NEW.socio_id
        AND a.hora_entrada::date = NEW.fecha
    LIMIT 1;

    IF _acceso_id IS NOT NULL THEN
        -- lo asigna
        NEW.acceso_id := _acceso_id;
    END IF;

    RETURN NEW;

END;
$$;

CREATE OR REPLACE TRIGGER trigger_asignar_acceso_id
BEFORE INSERT ON seguimientos
FOR each ROW
EXECUTE PROCEDURE asignar_acceso_id();
